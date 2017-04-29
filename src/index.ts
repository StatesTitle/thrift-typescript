import * as fs from 'fs'
import * as path from 'path'
import * as ts from 'typescript'
let thriftParser = require('thrift-parser')
import { compile } from 'handlebars'
import { registerHelpers } from './ts-helpers'

function readFile(fileName: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

function getStructs(idl: any) {
  const keys = idl.struct || []
  return Object.keys(keys).map(key => ({
    fields: idl.struct[key],
    name: key,
  }))
}

async function generateTypes(types: any) {
  const template: HandlebarsTemplateDelegate = await loadTemplate('types.hbs')
  return template(types)
}

function getServices(idl: any) {
  return Object.keys(idl.service).map(key => ({
    methods: idl.service[key],
    name: key,
  }))
}

async function generateServices(services: any) {
  const template: HandlebarsTemplateDelegate = await loadTemplate('services.hbs')
  return template(services)
}

export async function loadTemplate(fileName: string): Promise<HandlebarsTemplateDelegate> {
  const fullPath = path.join(__dirname, `../templates/${fileName}`)
  const src = await readFile(fullPath)
  return compile(src)
}

export function parseFile(fileName: string): Promise<any> {
  return readFile(fileName).then(idl => {
    return thriftParser(idl)
  })
}

export async function generateIDLTypes(fileName: string): Promise<string> {
  registerHelpers()
  const idl = await parseFile(fileName)
  const structs = getStructs(idl)
  return generateTypes(structs)
}

export async function generateIDLServices(fileName: string): Promise<string> {
  registerHelpers()
  const idl = await parseFile(fileName)
  let upcaseFile = path.basename(fileName).split('.thrift')[0]
  upcaseFile = upcaseFile[0].toUpperCase() + upcaseFile.substr(1)
  const input = {
    fileName: upcaseFile,
    services: getServices(idl),
    structs: getStructs(idl),
  }
  return generateServices(input)
}

function createConstructor(fields) {
  const _questionToken = ts.createToken(ts.SyntaxKind.QuestionToken);

  const _argsDeclaration = ts.createParameter(undefined, undefined, undefined, 'args', _questionToken, undefined, undefined);

  const _fieldDefaultExpressions = fields.map(function(field) {
    const _propertyAccessExpression = ts.createPropertyAccess(ts.createThis(), field.name);
    const _propertyAssignment = ts.createAssignment(_propertyAccessExpression, ts.createNull());
    const _propertyStatement = ts.createStatement(_propertyAssignment);

    return _propertyStatement;
  });

  const _fieldAssignments = fields.map(function(field) {
    const _argsPropAccess = ts.createPropertyAccess(ts.createIdentifier('args'), field.name);
    const _thisPropAccess = ts.createPropertyAccess(ts.createThis(), field.name);
    const _propertyAssignment = ts.createAssignment(_thisPropAccess, _argsPropAccess);
    const _assignStatment = ts.createStatement(_propertyAssignment)

    const _comparison = ts.createBinary(_argsPropAccess, ts.SyntaxKind.ExclamationEqualsToken, ts.createNull());

    let _else;
    if (field.option === 'required') {
      const _throwAccess = ts.createPropertyAccess(ts.createIdentifier('Thrift'), 'TProtocolException');
      const _errType = ts.createPropertyAccess(
        ts.createIdentifier('Thrift'),
        ts.createIdentifier('TProtocolExceptionType.UNKNOWN')
      )
      const _errArgs = [_errType, ts.createLiteral(`Required field ${field.name} is unset!`)];
      const _newError = ts.createNew(_throwAccess, undefined, _errArgs);
      const _throw = ts.createThrow(_newError);
      _else = ts.createBlock([_throw]);
    }
    const _if = ts.createIf(_comparison, ts.createBlock([_assignStatment]), _else);

    return _if;
  })

  const _ifArgs = ts.createIf(ts.createIdentifier('args'), ts.createBlock(_fieldAssignments));

  const _constructorBlock = ts.createBlock([
    ..._fieldDefaultExpressions,
    _ifArgs
  ], true);

  return ts.createConstructor(undefined, undefined, [_argsDeclaration], _constructorBlock);
}

function createRead(fields) {
  const _publicModifier = ts.createToken(ts.SyntaxKind.PublicKeyword);

  const _readStructBegin = ts.createPropertyAccess(ts.createIdentifier('input'), 'readStructBegin');
  const _readStructBeginCall = ts.createCall(_readStructBegin, undefined, undefined);
  const _readStructBeginStatement = ts.createStatement(_readStructBeginCall);

  const _readFieldBegin = ts.createPropertyAccess(ts.createIdentifier('input'), 'readFieldBegin');
  const _readFieldBeginCall = ts.createCall(_readFieldBegin, undefined, undefined);
  const _assignment = ts.createVariableDeclaration('ret', undefined, _readFieldBeginCall);
  const _assignmentDeclaration = ts.createVariableDeclarationList([_assignment], ts.NodeFlags.Const);
  const _assignmentConst = ts.createVariableStatement(undefined, _assignmentDeclaration);

  const _retFname = ts.createPropertyAccess(ts.createIdentifier('ret'), 'fname');
  const _fname = ts.createVariableDeclaration('fname', undefined, _retFname);
  const _fnameDeclaration = ts.createVariableDeclarationList([_fname], ts.NodeFlags.Const);
  const _fnameConst = ts.createVariableStatement(undefined, _fnameDeclaration);

  const _retFtype = ts.createPropertyAccess(ts.createIdentifier('ret'), 'ftype');
  const _ftype = ts.createVariableDeclaration('ftype', undefined, _retFtype);
  const _ftypeDeclaration = ts.createVariableDeclarationList([_ftype], ts.NodeFlags.Const);
  const _ftypeConst = ts.createVariableStatement(undefined, _ftypeDeclaration);

  const _retFid = ts.createPropertyAccess(ts.createIdentifier('ret'), 'fid');
  const _fid = ts.createVariableDeclaration('fid', undefined, _retFid);
  const _fidDeclaration = ts.createVariableDeclarationList([_fid], ts.NodeFlags.Const);
  const _fidConst = ts.createVariableStatement(undefined, _fidDeclaration);

  const _ftypeIdentifier = ts.createIdentifier('ftype');
  const _typeStopAccess = ts.createPropertyAccess(ts.createIdentifier('Thrift'), 'Type.STOP');
  const _comparison = ts.createStrictEquality(_ftypeIdentifier, _typeStopAccess);

  const _breakBlock = ts.createBlock([ts.createBreak()], true);

  const _ifStop = ts.createIf(_comparison, _breakBlock);

  const _cases = fields.map(function(field) {
    const type = field.type[0].toUpperCase() + field.type.slice(1);

    const _ftypeIdentifier = ts.createIdentifier('ftype');

    const _typeAccess = ts.createPropertyAccess(ts.createIdentifier('Thrift'), `Type.${type}`);
    const _comparison = ts.createStrictEquality(_ftypeIdentifier, _typeAccess);

    const _thisName = ts.createPropertyAccess(ts.createThis(), field.name);
    const _readType = ts.createPropertyAccess(ts.createIdentifier('input'), `read${type}`);
    const _readTypeCall = ts.createCall(_readType, undefined, undefined);
    const _readAssignment = ts.createAssignment(_thisName, _readTypeCall);
    const _readStatement = ts.createStatement(_readAssignment);
    const _readTypeBlock = ts.createBlock([_readStatement], true);

    const _skip = ts.createPropertyAccess(ts.createIdentifier('input'), 'skip');
    const _skipCall = ts.createCall(_skip, undefined, [_ftypeIdentifier]);
    const _skipStatement = ts.createStatement(_skipCall);
    const _skipBlock = ts.createBlock([_skipStatement], true);

    const _break = ts.createBreak();

    const _ifType = ts.createIf(_comparison, _readTypeBlock, _skipBlock);

    return ts.createCaseClause(ts.createLiteral(field.id), [
      ts.createBlock([_ifType, _break], true)
    ]);
  });

  // TODO: duplicate code
  const _skip = ts.createPropertyAccess(ts.createIdentifier('input'), 'skip');
  const _skipCall = ts.createCall(_skip, undefined, [_ftypeIdentifier]);
  const _skipStatement = ts.createStatement(_skipCall);
  const _skipBlock = ts.createBlock([_skipStatement], true);

  const _default = ts.createDefaultClause([_skipBlock])
  const _caseBlock = ts.createCaseBlock([
    ..._cases,
    _default
  ]);
  const _switch = ts.createSwitch(ts.createIdentifier('fid'), _caseBlock);

  const _readFieldEnd = ts.createPropertyAccess(ts.createIdentifier('input'), 'readFieldEnd');
  const _readFieldEndCall = ts.createCall(_readFieldEnd, undefined, undefined);
  const _readFieldEndStatement = ts.createStatement(_readFieldEndCall);

  const _whileBody = ts.createBlock([
    _assignmentConst,
    _fnameConst,
    _ftypeConst,
    _fidConst,
    _ifStop,
    _switch,
    _readFieldEndStatement
  ], true);

  const _while = ts.createWhile(ts.createTrue(), _whileBody);

  const _readStructEnd = ts.createPropertyAccess(ts.createIdentifier('input'), 'readStructEnd');
  const _readStructEndCall = ts.createCall(_readStructEnd, undefined, undefined);
  const _readStructEndStatement = ts.createStatement(_readStructEndCall);

  const _readBlock = ts.createBlock([
    _readStructBeginStatement,
    _while,
    _readStructEndStatement
  ], true);

  const _inputDeclaration = ts.createParameter(undefined, undefined, undefined, 'input', undefined, undefined, undefined);
  return ts.createMethodDeclaration(undefined, [_publicModifier], undefined, 'read', undefined, undefined, [_inputDeclaration], undefined, _readBlock);
}

function createWrite(service) {
  const _publicModifier = ts.createToken(ts.SyntaxKind.PublicKeyword);

  const _writeStructBegin = ts.createPropertyAccess(ts.createIdentifier('output'), 'writeStructBegin');
  const _writeStructBeginCall = ts.createCall(_writeStructBegin, undefined, [ts.createLiteral(`${service.name}`)]);
  const _writeStructBeginStatement = ts.createStatement(_writeStructBeginCall);

  const _writeFields = service.fields.map(function(field) {
    const type = field.type[0].toUpperCase() + field.type.slice(1);
    const _thisPropAccess = ts.createPropertyAccess(ts.createThis(), field.name);
    const _comparison = ts.createBinary(_thisPropAccess, ts.SyntaxKind.ExclamationEqualsToken, ts.createNull());

    const _writeFieldBegin = ts.createPropertyAccess(ts.createIdentifier('output'), 'writeFieldBegin');
    const _writeFieldBeginCall = ts.createCall(_writeFieldBegin, undefined, [
      ts.createLiteral(field.name),
      ts.createPropertyAccess(ts.createIdentifier('Thrift'), `Type.${type}`),
      ts.createLiteral(field.id)
    ]);
    const _writeFieldBeginStatement = ts.createStatement(_writeFieldBeginCall);

    const _writeType = ts.createPropertyAccess(ts.createIdentifier('output'), `write${type}`);
    const _writeTypeCall = ts.createCall(_writeType, undefined, [
      ts.createPropertyAccess(ts.createThis(), field.name)
    ]);
    const _writeTypeStatement = ts.createStatement(_writeTypeCall);

    const _writeFieldEnd = ts.createPropertyAccess(ts.createIdentifier('output'), 'writeFieldEnd');
    const _writeFieldEndCall = ts.createCall(_writeFieldEnd, undefined, undefined);
    const _writeFieldEndStatement = ts.createStatement(_writeFieldEndCall);

    const _if = ts.createIf(_comparison, ts.createBlock([
      _writeFieldBeginStatement,
      _writeTypeStatement,
      _writeFieldEndStatement
    ]));

    return _if;
  });

  const _writeFieldStop = ts.createPropertyAccess(ts.createIdentifier('output'), 'writeFieldStop');
  const _writeFieldStopCall = ts.createCall(_writeFieldStop, undefined, undefined);
  const _writeFieldStopStatement = ts.createStatement(_writeFieldStopCall);

  const _writeStructEnd = ts.createPropertyAccess(ts.createIdentifier('output'), 'writeStructEnd');
  const _writeStructEndCall = ts.createCall(_writeStructEnd, undefined, undefined);
  const _writeStructEndStatement = ts.createStatement(_writeStructEndCall);

  const _writeBlock = ts.createBlock([
    _writeStructBeginStatement,
    ..._writeFields,
    _writeFieldStopStatement,
    _writeStructEndStatement
  ], true);

  const _outputDeclaration = ts.createParameter(undefined, undefined, undefined, 'output', undefined, undefined, undefined);
  return ts.createMethodDeclaration(undefined, [_publicModifier], undefined, 'write', undefined, undefined, [_outputDeclaration], undefined, _writeBlock);
}

function generateServicesAST(services: any[]): string {
  // TODO: bundle maybe?
  let src = ts.createSourceFile('output.ts', '', ts.ScriptTarget.ES5, false, ts.ScriptKind.TS);
  // TODO: imports?

  services.forEach(function(service) {
    const _exportModifier = ts.createToken(ts.SyntaxKind.ExportKeyword);
    const _publicModifier = ts.createToken(ts.SyntaxKind.PublicKeyword);
    const _numberKeyword = ts.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword);
    const _stringKeyword = ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
    const _booleanKeyword = ts.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword);
    const _questionToken = ts.createToken(ts.SyntaxKind.QuestionToken);

    const _fieldDeclarations = service.fields.map(function(field) {

      let _optional;
      // TODO: doesn't seem to be working
      switch(field.option) {
        case 'optional':
          _optional = _questionToken;
          break;
      }

      let _type;
      switch(field.type) {
        case 'int':
        case 'i16':
        case 'i32':
          _type = _numberKeyword;
          break;
        case 'string':
          _type = _stringKeyword;
          break;
        case 'bool':
          _type = _booleanKeyword;
          break;
      }

      let _default;
      if (field.defaultValue != null) {
        _default = ts.createLiteral(field.defaultValue);
      }

      return ts.createProperty(undefined, [_publicModifier], field.name, _optional, _type, _default);
    });

    const _successDeclaration = ts.createProperty(undefined, [_publicModifier], 'success', undefined, _booleanKeyword, undefined);

    // Build the constructor body
    const _constructor = createConstructor(service.fields);

    // Build the `read` method
    const _read = createRead(service.fields);

    // Build the `write` method
    const _write = createWrite(service);

    const _propertyDeclarations = [_successDeclaration, ..._fieldDeclarations];

    const _classExpression = ts.createClassExpression([_exportModifier], service.name, [], [], [
      ..._propertyDeclarations,
      _constructor,
      _read,
      _write
    ]);

    const _classStatement = ts.createStatement(_classExpression);

    let _require = ts.createImportEqualsDeclaration(undefined, undefined, 'thrift', ts.createExternalModuleReference(ts.createLiteral('thrift')));
    const _namespaceThrift = ts.createImportEqualsDeclaration(undefined, undefined, 'Thrift', ts.createIdentifier('thrift.Thrift'));
    const _namespaceQ = ts.createImportEqualsDeclaration(undefined, undefined, 'Q', ts.createIdentifier('thrift.Q'));

    _require = ts.addSyntheticLeadingComment(_require, ts.SyntaxKind.SingleLineCommentTrivia, '', false);
    _require = ts.addSyntheticLeadingComment(_require, ts.SyntaxKind.SingleLineCommentTrivia, ' Autogenerated by thrift-typescript', false);
    _require = ts.addSyntheticLeadingComment(_require, ts.SyntaxKind.SingleLineCommentTrivia, '', false);
    _require = ts.addSyntheticLeadingComment(_require, ts.SyntaxKind.SingleLineCommentTrivia, ' DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING', false);
    _require = ts.addSyntheticLeadingComment(_require, ts.SyntaxKind.SingleLineCommentTrivia, '', true);

    src = ts.updateSourceFileNode(src, [
      _require,
      _namespaceThrift,
      _namespaceQ,
      _classStatement
    ]);
  });


  const printer = ts.createPrinter();

  return printer.printFile(src);
}

export async function generateIDLTypesAST(filename: string): Promise<string> {
  registerHelpers();
  const idl = await parseFile(filename);
  const structs = getStructs(idl);
  return generateServicesAST(structs);
}

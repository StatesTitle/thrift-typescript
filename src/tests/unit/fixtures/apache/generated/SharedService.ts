/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v{{VERSION}}
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "test-lib";
import * as SharedServiceBase from "./SharedServiceBase";
import * as SharedUnion from "./SharedUnion";
import * as SharedEnum from "./SharedEnum";
export interface IGetUnionArgsArgs {
    index: number;
}
export class GetUnionArgs {
    public index: number;
    constructor(args: IGetUnionArgsArgs) {
        if (args != null && args.index != null) {
            this.index = args.index;
        }
        else {
            throw new thrift.Thrift.TProtocolException(thrift.Thrift.TProtocolExceptionType.UNKNOWN, "Required field[index] is unset!");
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("GetUnionArgs");
        if (this.index != null) {
            output.writeFieldBegin("index", thrift.Thrift.Type.I32, 1);
            output.writeI32(this.index);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): GetUnionArgs {
        input.readStructBegin();
        let _args: any = {};
        while (true) {
            const ret: thrift.TField = input.readFieldBegin();
            const fieldType: thrift.Thrift.Type = ret.ftype;
            const fieldId: number = ret.fid;
            if (fieldType === thrift.Thrift.Type.STOP) {
                break;
            }
            switch (fieldId) {
                case 1:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_1: number = input.readI32();
                        _args.index = value_1;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                default: {
                    input.skip(fieldType);
                }
            }
            input.readFieldEnd();
        }
        input.readStructEnd();
        if (_args.index !== undefined) {
            return new GetUnionArgs(_args);
        }
        else {
            throw new thrift.Thrift.TProtocolException(thrift.Thrift.TProtocolExceptionType.UNKNOWN, "Unable to read GetUnionArgs from input");
        }
    }
}
export interface IGetEnumArgsArgs {
}
export class GetEnumArgs {
    constructor() {
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("GetEnumArgs");
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): GetEnumArgs {
        input.readStructBegin();
        while (true) {
            const ret: thrift.TField = input.readFieldBegin();
            const fieldType: thrift.Thrift.Type = ret.ftype;
            const fieldId: number = ret.fid;
            if (fieldType === thrift.Thrift.Type.STOP) {
                break;
            }
            switch (fieldId) {
                default: {
                    input.skip(fieldType);
                }
            }
            input.readFieldEnd();
        }
        input.readStructEnd();
        return new GetEnumArgs();
    }
}
export interface IGetUnionResultArgs {
    success?: SharedUnion.SharedUnion;
}
export class GetUnionResult {
    public success?: SharedUnion.SharedUnion;
    constructor(args?: IGetUnionResultArgs) {
        if (args != null && args.success != null) {
            this.success = args.success;
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("GetUnionResult");
        if (this.success != null) {
            output.writeFieldBegin("success", thrift.Thrift.Type.STRUCT, 0);
            this.success.write(output);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): GetUnionResult {
        input.readStructBegin();
        let _args: any = {};
        while (true) {
            const ret: thrift.TField = input.readFieldBegin();
            const fieldType: thrift.Thrift.Type = ret.ftype;
            const fieldId: number = ret.fid;
            if (fieldType === thrift.Thrift.Type.STOP) {
                break;
            }
            switch (fieldId) {
                case 0:
                    if (fieldType === thrift.Thrift.Type.STRUCT) {
                        const value_2: SharedUnion.SharedUnion = SharedUnion.SharedUnion.read(input);
                        _args.success = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                default: {
                    input.skip(fieldType);
                }
            }
            input.readFieldEnd();
        }
        input.readStructEnd();
        return new GetUnionResult(_args);
    }
}
export interface IGetEnumResultArgs {
    success?: SharedEnum.SharedEnum;
}
export class GetEnumResult {
    public success?: SharedEnum.SharedEnum;
    constructor(args?: IGetEnumResultArgs) {
        if (args != null && args.success != null) {
            this.success = args.success;
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("GetEnumResult");
        if (this.success != null) {
            output.writeFieldBegin("success", thrift.Thrift.Type.I32, 0);
            output.writeI32(this.success);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): GetEnumResult {
        input.readStructBegin();
        let _args: any = {};
        while (true) {
            const ret: thrift.TField = input.readFieldBegin();
            const fieldType: thrift.Thrift.Type = ret.ftype;
            const fieldId: number = ret.fid;
            if (fieldType === thrift.Thrift.Type.STOP) {
                break;
            }
            switch (fieldId) {
                case 0:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_3: SharedEnum.SharedEnum = input.readI32();
                        _args.success = value_3;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                default: {
                    input.skip(fieldType);
                }
            }
            input.readFieldEnd();
        }
        input.readStructEnd();
        return new GetEnumResult(_args);
    }
}
export class Client extends SharedServiceBase.Client {
    public _seqid: number;
    public _reqs: {
        [name: number]: (err: Error | object | undefined, val?: any) => void;
    };
    public output: thrift.TTransport;
    public protocol: new (trans: thrift.TTransport) => thrift.TProtocol;
    constructor(output: thrift.TTransport, protocol: new (trans: thrift.TTransport) => thrift.TProtocol) {
        super(output, protocol);
        this._seqid = 0;
        this._reqs = {};
        this.output = output;
        this.protocol = protocol;
    }
    public incrementSeqId(): number {
        return this._seqid += 1;
    }
    public getUnion(index: number): Promise<SharedUnion.SharedUnion> {
        const requestId: number = this.incrementSeqId();
        return new Promise<SharedUnion.SharedUnion>((resolve, reject): void => {
            this._reqs[requestId] = (error, result) => {
                delete this._reqs[requestId];
                if (error != null) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            };
            this.send_getUnion(index, requestId);
        });
    }
    public getEnum(): Promise<SharedEnum.SharedEnum> {
        const requestId: number = this.incrementSeqId();
        return new Promise<SharedEnum.SharedEnum>((resolve, reject): void => {
            this._reqs[requestId] = (error, result) => {
                delete this._reqs[requestId];
                if (error != null) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            };
            this.send_getEnum(requestId);
        });
    }
    public send_getUnion(index: number, requestId: number): void {
        const output: thrift.TProtocol = new this.protocol(this.output);
        output.writeMessageBegin("getUnion", thrift.Thrift.MessageType.CALL, requestId);
        const args: GetUnionArgs = new GetUnionArgs({ index });
        args.write(output);
        output.writeMessageEnd();
        this.output.flush();
        return;
    }
    public send_getEnum(requestId: number): void {
        const output: thrift.TProtocol = new this.protocol(this.output);
        output.writeMessageBegin("getEnum", thrift.Thrift.MessageType.CALL, requestId);
        const args: GetEnumArgs = new GetEnumArgs();
        args.write(output);
        output.writeMessageEnd();
        this.output.flush();
        return;
    }
    public recv_getUnion(input: thrift.TProtocol, mtype: thrift.Thrift.MessageType, requestId: number): void {
        const noop = (): any => null;
        const callback = this._reqs[requestId] || noop;
        if (mtype === thrift.Thrift.MessageType.EXCEPTION) {
            const x: thrift.Thrift.TApplicationException = new thrift.Thrift.TApplicationException();
            x.read(input);
            input.readMessageEnd();
            return callback(x);
        }
        else {
            const result: GetUnionResult = GetUnionResult.read(input);
            input.readMessageEnd();
            if (result.success != null) {
                return callback(undefined, result.success);
            }
            else {
                return callback(new thrift.Thrift.TApplicationException(thrift.Thrift.TApplicationExceptionType.UNKNOWN, "getUnion failed: unknown result"));
            }
        }
    }
    public recv_getEnum(input: thrift.TProtocol, mtype: thrift.Thrift.MessageType, requestId: number): void {
        const noop = (): any => null;
        const callback = this._reqs[requestId] || noop;
        if (mtype === thrift.Thrift.MessageType.EXCEPTION) {
            const x: thrift.Thrift.TApplicationException = new thrift.Thrift.TApplicationException();
            x.read(input);
            input.readMessageEnd();
            return callback(x);
        }
        else {
            const result: GetEnumResult = GetEnumResult.read(input);
            input.readMessageEnd();
            if (result.success != null) {
                return callback(undefined, result.success);
            }
            else {
                return callback(new thrift.Thrift.TApplicationException(thrift.Thrift.TApplicationExceptionType.UNKNOWN, "getEnum failed: unknown result"));
            }
        }
    }
}
export interface ILocalHandler {
    getUnion(index: number): SharedUnion.SharedUnion | Promise<SharedUnion.SharedUnion>;
    getEnum(): SharedEnum.SharedEnum | Promise<SharedEnum.SharedEnum>;
}
export type IHandler = ILocalHandler & SharedServiceBase.IHandler;
export class Processor extends SharedServiceBase.Processor {
    public _handler: IHandler;
    constructor(handler: IHandler) {
        super({
            getStruct: handler.getStruct
        });
        this._handler = handler;
    }
    public process(input: thrift.TProtocol, output: thrift.TProtocol): void {
        const metadata: thrift.TMessage = input.readMessageBegin();
        const fname: string = metadata.fname;
        const requestId: number = metadata.rseqid;
        const methodName: string = "process_" + fname;
        switch (methodName) {
            case "process_getStruct": {
                this.process_getStruct(requestId, input, output);
                return;
            }
            case "process_getUnion": {
                this.process_getUnion(requestId, input, output);
                return;
            }
            case "process_getEnum": {
                this.process_getEnum(requestId, input, output);
                return;
            }
            default: {
                input.skip(thrift.Thrift.Type.STRUCT);
                input.readMessageEnd();
                const errMessage = "Unknown function " + fname;
                const err = new thrift.Thrift.TApplicationException(thrift.Thrift.TApplicationExceptionType.UNKNOWN_METHOD, errMessage);
                output.writeMessageBegin(fname, thrift.Thrift.MessageType.EXCEPTION, requestId);
                err.write(output);
                output.writeMessageEnd();
                output.flush();
                return;
            }
        }
    }
    public process_getUnion(requestId: number, input: thrift.TProtocol, output: thrift.TProtocol): void {
        new Promise<SharedUnion.SharedUnion>((resolve, reject): void => {
            try {
                const args: GetUnionArgs = GetUnionArgs.read(input);
                input.readMessageEnd();
                resolve(this._handler.getUnion(args.index));
            }
            catch (err) {
                reject(err);
            }
        }).then((data: SharedUnion.SharedUnion): void => {
            const result: GetUnionResult = new GetUnionResult({ success: data });
            output.writeMessageBegin("getUnion", thrift.Thrift.MessageType.REPLY, requestId);
            result.write(output);
            output.writeMessageEnd();
            output.flush();
            return;
        }).catch((err: Error): void => {
            console.error("Unexpected exception while handling getUnion: ", err);
            const result: thrift.Thrift.TApplicationException = new thrift.Thrift.TApplicationException(thrift.Thrift.TApplicationExceptionType.UNKNOWN, err.message);
            output.writeMessageBegin("getUnion", thrift.Thrift.MessageType.EXCEPTION, requestId);
            result.write(output);
            output.writeMessageEnd();
            output.flush();
            return;
        });
    }
    public process_getEnum(requestId: number, input: thrift.TProtocol, output: thrift.TProtocol): void {
        new Promise<SharedEnum.SharedEnum>((resolve, reject): void => {
            try {
                input.readMessageEnd();
                resolve(this._handler.getEnum());
            }
            catch (err) {
                reject(err);
            }
        }).then((data: SharedEnum.SharedEnum): void => {
            const result: GetEnumResult = new GetEnumResult({ success: data });
            output.writeMessageBegin("getEnum", thrift.Thrift.MessageType.REPLY, requestId);
            result.write(output);
            output.writeMessageEnd();
            output.flush();
            return;
        }).catch((err: Error): void => {
            console.error("Unexpected exception while handling getEnum: ", err);
            const result: thrift.Thrift.TApplicationException = new thrift.Thrift.TApplicationException(thrift.Thrift.TApplicationExceptionType.UNKNOWN, err.message);
            output.writeMessageBegin("getEnum", thrift.Thrift.MessageType.EXCEPTION, requestId);
            result.write(output);
            output.writeMessageEnd();
            output.flush();
            return;
        });
    }
}

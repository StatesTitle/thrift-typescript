/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v{{VERSION}}
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "test-lib";
import * as SharedStruct from "./SharedStruct";
export const serviceName: string = "SharedServiceBase";
export const annotations: thrift.IThriftAnnotations = {};
export const methodAnnotations: thrift.IMethodAnnotations = {
    getStruct: {
        annotations: {},
        fieldAnnotations: {}
    }
};
export const methodNames: Array<string> = ["getStruct"];
export const methodParameters: {
    [methodName: string]: number;
} = {
    getStruct: 2
};
export interface IGetStruct__Args {
    __name: "GetStruct__Args";
    key: number;
}
export interface IGetStruct__ArgsArgs {
    key: number;
}
export const GetStruct__ArgsCodec: thrift.IStructCodec<IGetStruct__ArgsArgs, IGetStruct__Args> = {
    encode(args: IGetStruct__ArgsArgs, output: thrift.TProtocol): void {
        const obj: any = {
            key: args.key
        };
        output.writeStructBegin("GetStruct__Args");
        if (obj.key != null) {
            output.writeFieldBegin("key", thrift.TType.I32, 1);
            output.writeI32(obj.key);
            output.writeFieldEnd();
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[key] is unset!");
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    },
    decode(input: thrift.TProtocol): IGetStruct__Args {
        let _args: any = {};
        input.readStructBegin();
        while (true) {
            const ret: thrift.IThriftField = input.readFieldBegin();
            const fieldType: thrift.TType = ret.fieldType;
            const fieldId: number = ret.fieldId;
            if (fieldType === thrift.TType.STOP) {
                break;
            }
            switch (fieldId) {
                case 1:
                    if (fieldType === thrift.TType.I32) {
                        const value_1: number = input.readI32();
                        _args.key = value_1;
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
        if (_args.key !== undefined) {
            return {
                __name: "GetStruct__Args",
                key: _args.key
            };
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Unable to read GetStruct__Args from input");
        }
    }
};
export class GetStruct__Args extends thrift.StructLike implements IGetStruct__Args {
    public key: number;
    public readonly __name = "GetStruct__Args";
    public readonly _annotations: thrift.IThriftAnnotations = {};
    public readonly _fieldAnnotations: thrift.IFieldAnnotations = {};
    constructor(args: IGetStruct__ArgsArgs) {
        super();
        if (args.key != null) {
            const value_2: number = args.key;
            this.key = value_2;
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[key] is unset!");
        }
    }
    public static read(input: thrift.TProtocol): GetStruct__Args {
        return new GetStruct__Args(GetStruct__ArgsCodec.decode(input));
    }
    public static write(args: IGetStruct__ArgsArgs, output: thrift.TProtocol): void {
        return GetStruct__ArgsCodec.encode(args, output);
    }
    public write(output: thrift.TProtocol): void {
        return GetStruct__ArgsCodec.encode(this, output);
    }
}
export interface IGetStruct__Result {
    __name: "GetStruct__Result";
    success?: SharedStruct.ISharedStruct;
}
export interface IGetStruct__ResultArgs {
    success?: SharedStruct.ISharedStructArgs;
}
export const GetStruct__ResultCodec: thrift.IStructCodec<IGetStruct__ResultArgs, IGetStruct__Result> = {
    encode(args: IGetStruct__ResultArgs, output: thrift.TProtocol): void {
        const obj: any = {
            success: args.success
        };
        output.writeStructBegin("GetStruct__Result");
        if (obj.success != null) {
            output.writeFieldBegin("success", thrift.TType.STRUCT, 0);
            SharedStruct.SharedStructCodec.encode(obj.success, output);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    },
    decode(input: thrift.TProtocol): IGetStruct__Result {
        let _args: any = {};
        input.readStructBegin();
        while (true) {
            const ret: thrift.IThriftField = input.readFieldBegin();
            const fieldType: thrift.TType = ret.fieldType;
            const fieldId: number = ret.fieldId;
            if (fieldType === thrift.TType.STOP) {
                break;
            }
            switch (fieldId) {
                case 0:
                    if (fieldType === thrift.TType.STRUCT) {
                        const value_3: SharedStruct.ISharedStruct = SharedStruct.SharedStructCodec.decode(input);
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
        return {
            __name: "GetStruct__Result",
            success: _args.success
        };
    }
};
export class GetStruct__Result extends thrift.StructLike implements IGetStruct__Result {
    public success?: SharedStruct.ISharedStruct;
    public readonly __name = "GetStruct__Result";
    public readonly _annotations: thrift.IThriftAnnotations = {};
    public readonly _fieldAnnotations: thrift.IFieldAnnotations = {};
    constructor(args: IGetStruct__ResultArgs = {}) {
        super();
        if (args.success != null) {
            const value_4: SharedStruct.ISharedStruct = new SharedStruct.SharedStruct(args.success);
            this.success = value_4;
        }
    }
    public static read(input: thrift.TProtocol): GetStruct__Result {
        return new GetStruct__Result(GetStruct__ResultCodec.decode(input));
    }
    public static write(args: IGetStruct__ResultArgs, output: thrift.TProtocol): void {
        return GetStruct__ResultCodec.encode(args, output);
    }
    public write(output: thrift.TProtocol): void {
        return GetStruct__ResultCodec.encode(this, output);
    }
}
export class Client<Context = any> extends thrift.ThriftClient<Context> {
    public static readonly serviceName: string = serviceName;
    public static readonly annotations: thrift.IThriftAnnotations = annotations;
    public static readonly methodAnnotations: thrift.IMethodAnnotations = methodAnnotations;
    public static readonly methodNames: Array<string> = methodNames;
    public readonly _serviceName: string = serviceName;
    public readonly _annotations: thrift.IThriftAnnotations = annotations;
    public readonly _methodAnnotations: thrift.IMethodAnnotations = methodAnnotations;
    public readonly _methodNames: Array<string> = methodNames;
    public readonly _methodParameters?: {
        [methodName: string]: number;
    } = methodParameters;
    public getStruct(key: number, context?: Context): Promise<SharedStruct.ISharedStruct> {
        const writer: thrift.TTransport = new this.transport();
        const output: thrift.TProtocol = new this.protocol(writer);
        output.writeMessageBegin("getStruct", thrift.MessageType.CALL, this.incrementRequestId());
        const args: IGetStruct__ArgsArgs = { key };
        GetStruct__ArgsCodec.encode(args, output);
        output.writeMessageEnd();
        return this.connection.send(writer.flush(), context).then((data: Buffer) => {
            const reader: thrift.TTransport = this.transport.receiver(data);
            const input: thrift.TProtocol = new this.protocol(reader);
            try {
                const { fieldName: fieldName, messageType: messageType }: thrift.IThriftMessage = input.readMessageBegin();
                if (fieldName === "getStruct") {
                    if (messageType === thrift.MessageType.EXCEPTION) {
                        const err: thrift.TApplicationException = thrift.TApplicationExceptionCodec.decode(input);
                        input.readMessageEnd();
                        return Promise.reject(err);
                    }
                    else {
                        const result: IGetStruct__Result = GetStruct__ResultCodec.decode(input);
                        input.readMessageEnd();
                        if (result.success != null) {
                            return Promise.resolve(result.success);
                        }
                        else {
                            return Promise.reject(new thrift.TApplicationException(thrift.TApplicationExceptionType.UNKNOWN, "getStruct failed: unknown result"));
                        }
                    }
                }
                else {
                    return Promise.reject(new thrift.TApplicationException(thrift.TApplicationExceptionType.WRONG_METHOD_NAME, "Received a response to an unknown RPC function: " + fieldName));
                }
            }
            catch (err) {
                return Promise.reject(err);
            }
        });
    }
}
export interface IHandler<Context = any> {
    getStruct(key: number, context?: Context): SharedStruct.ISharedStructArgs | Promise<SharedStruct.ISharedStructArgs>;
}
export class Processor<Context = any> extends thrift.ThriftProcessor<Context, IHandler<Context>> {
    protected readonly _handler: IHandler<Context>;
    public static readonly serviceName: string = serviceName;
    public static readonly annotations: thrift.IThriftAnnotations = annotations;
    public static readonly methodAnnotations: thrift.IMethodAnnotations = methodAnnotations;
    public static readonly methodNames: Array<string> = methodNames;
    public readonly _serviceName: string = serviceName;
    public readonly _annotations: thrift.IThriftAnnotations = annotations;
    public readonly _methodAnnotations: thrift.IMethodAnnotations = methodAnnotations;
    public readonly _methodNames: Array<string> = methodNames;
    constructor(handler: IHandler<Context>) {
        super();
        this._handler = handler;
    }
    public process(input: thrift.TProtocol, output: thrift.TProtocol, context: Context): Promise<Buffer> {
        return new Promise<Buffer>((resolve, reject): void => {
            const metadata: thrift.IThriftMessage = input.readMessageBegin();
            const fieldName: string = metadata.fieldName;
            const requestId: number = metadata.requestId;
            const methodName: string = "process_" + fieldName;
            switch (methodName) {
                case "process_getStruct": {
                    resolve(this.process_getStruct(requestId, input, output, context));
                    break;
                }
                default: {
                    input.skip(thrift.TType.STRUCT);
                    input.readMessageEnd();
                    const errMessage = "Unknown function " + fieldName;
                    const err = new thrift.TApplicationException(thrift.TApplicationExceptionType.UNKNOWN_METHOD, errMessage);
                    output.writeMessageBegin(fieldName, thrift.MessageType.EXCEPTION, requestId);
                    thrift.TApplicationExceptionCodec.encode(err, output);
                    output.writeMessageEnd();
                    resolve(output.flush());
                    break;
                }
            }
        });
    }
    public process_getStruct(requestId: number, input: thrift.TProtocol, output: thrift.TProtocol, context: Context): Promise<Buffer> {
        return new Promise<SharedStruct.ISharedStructArgs>((resolve, reject): void => {
            try {
                const args: IGetStruct__Args = GetStruct__ArgsCodec.decode(input);
                input.readMessageEnd();
                resolve(this._handler.getStruct(args.key, context));
            }
            catch (err) {
                reject(err);
            }
        }).then((data: SharedStruct.ISharedStructArgs): Buffer => {
            const result: IGetStruct__ResultArgs = { success: data };
            output.writeMessageBegin("getStruct", thrift.MessageType.REPLY, requestId);
            GetStruct__ResultCodec.encode(result, output);
            output.writeMessageEnd();
            return output.flush();
        }).catch((err: Error): Buffer => {
            console.error("Unexpected exception while handling getStruct: ", err);
            const result: thrift.TApplicationException = new thrift.TApplicationException(thrift.TApplicationExceptionType.UNKNOWN, err.message);
            output.writeMessageBegin("getStruct", thrift.MessageType.EXCEPTION, requestId);
            thrift.TApplicationExceptionCodec.encode(result, output);
            output.writeMessageEnd();
            return output.flush();
        });
    }
}

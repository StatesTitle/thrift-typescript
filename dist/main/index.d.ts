import { IMakeOptions, ISourceFile, IThriftProject } from './types';
import { generateProject } from './generator';
import * as Sys from './sys';
import * as Utils from './utils';
export * from './types';
export * from './resolver';
export * from './parser';
export { Utils };
export { Sys };
export * from '@creditkarma/thrift-parser';
export { generateProject };
export declare function make(source: string, options?: Partial<IMakeOptions>): string;
export declare function readThriftFiles(options: {
    rootDir: string;
    sourceDir: string;
    files?: Array<string>;
}): Promise<Array<ISourceFile>>;
export declare function thriftProjectFromSourceFiles(sourceFiles: Array<ISourceFile>, options?: Partial<IMakeOptions>): IThriftProject;
export declare function processThriftProject(options?: Partial<IMakeOptions>): Promise<IThriftProject>;
export declare function generate(options?: Partial<IMakeOptions>): Promise<void>;

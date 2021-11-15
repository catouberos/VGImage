export type FileType = 'png' | 'jpeg';
export type Theme = 'light' | 'dark';

export interface ParsedRequest {
    fileType: FileType;
    text: string;
    subText: string;
    category: string;
    summary: string;
    score: string;
    bgColor: string;
    image: string;
}

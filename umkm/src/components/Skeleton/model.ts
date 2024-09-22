type TypeSkeleton = "text" | "image" | "avatar" | 'span' | "random" | "input" | "custom";
export interface Model{
    type: TypeSkeleton;
    className?: string;
}
type TagType = 'code' | 'text';
type TagVariant = 'default' | 'accent' | 'success' | 'done' | 'error';
type TagSize = 'xs' | 'sm' | 'lg';
export interface Model {
    type: TagType
    variant?: TagVariant
    value: string
    size?: TagSize
    className?: string
}
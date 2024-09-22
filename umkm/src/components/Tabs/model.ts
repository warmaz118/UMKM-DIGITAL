type TabsDirection = 'horizontal' | 'vertical';
type TabsWidth = 'wrap' | 'block';
type TabsVariant = 'solid' | 'underlined' | 'bordered' | 'light';
export interface ModelTabs {
    tabDirection?: TabsDirection;
    tabSpace?: string;
    tabPadding?: string;
    tabVariant?: TabsVariant;
    width?: TabsWidth;
    classTitle?: string;
    children: Array<React.ReactElement>;
}

export interface ModelTabsTitle {
    index: number;
    selected: number;
    setSelectedTab: (index: number) => void;
    title: string;
    padding?: string;
    className?: string;
  }
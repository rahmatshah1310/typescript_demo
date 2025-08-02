interface TabItem {
  id: string | number;
  icon: React.ReactNode;
  label: string;
}

interface TabsProps {
  tabs: TabItem[] | null;
  activeTab: string | number;
  onTabChange: (id: string | number) => void;
}

const Tab: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  if (!tabs) return null;

  return (
    <div className="border-t border-gray-800">
      <div className="flex justify-center gap-12">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-4 px-4 font-medium flex items-center gap-2 ${activeTab === tab.id ? "border-t border-white text-white" : "text-gray-500"}`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tab;

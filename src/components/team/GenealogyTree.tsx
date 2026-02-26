"use client";

import React from 'react';
import { User, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";

interface TreeNodeProps {
  name: string;
  role: string;
  level: number;
  children?: TreeNodeProps[];
  isLast?: boolean;
}

const TreeNode = ({ node, depth = 0 }: { node: TreeNodeProps; depth?: number }) => {
  const [isOpen, setIsOpen] = React.useState(depth < 1);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="ml-4 border-l-2 border-indigo-100 pl-6 py-2 relative">
      {/* Connection Line */}
      <div className="absolute left-0 top-8 w-6 h-0.5 bg-indigo-100"></div>
      
      <div 
        className={cn(
          "flex items-center gap-3 p-3 rounded-2xl transition-all cursor-pointer group",
          isOpen ? "bg-indigo-50/50" : "hover:bg-gray-50"
        )}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-sm",
          node.level === 1 ? "bg-indigo-600" : "bg-indigo-400"
        )}>
          {node.name[0]}
        </div>
        
        <div className="flex-1">
          <h4 className="text-sm font-bold text-gray-900">{node.name}</h4>
          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{node.role} • Level {node.level}</p>
        </div>

        {hasChildren && (
          <div className="text-gray-400 group-hover:text-indigo-600 transition-colors">
            {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </div>
        )}
      </div>

      {hasChildren && isOpen && (
        <div className="mt-2 space-y-1">
          {node.children?.map((child, idx) => (
            <TreeNode key={idx} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const GenealogyTree = () => {
  const mockData: TreeNodeProps = {
    name: "You (Alex Johnson)",
    role: "Gold Member",
    level: 0,
    children: [
      {
        name: "John Doe",
        role: "Silver Member",
        level: 1,
        children: [
          { name: "Mike Kane", role: "Distributor", level: 2 },
          { name: "Sarah Connor", role: "Distributor", level: 2 },
        ]
      },
      {
        name: "Alice Smith",
        role: "Silver Member",
        level: 1,
        children: [
          { name: "Bob Wilson", role: "Distributor", level: 2 },
        ]
      },
      {
        name: "Emma Watson",
        role: "Distributor",
        level: 1,
      }
    ]
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900">Genealogy Tree</h3>
        <p className="text-sm text-gray-500">Visualize your downline organization up to 9 levels.</p>
      </div>
      
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 p-4 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-100 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <User size={24} />
          </div>
          <div>
            <h4 className="font-bold">{mockData.name}</h4>
            <p className="text-xs text-indigo-100">{mockData.role}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          {mockData.children?.map((child, idx) => (
            <TreeNode key={idx} node={child} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenealogyTree;
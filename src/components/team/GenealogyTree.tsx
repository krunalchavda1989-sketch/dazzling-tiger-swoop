"use client";

import React, { useEffect, useState } from 'react';
import { User, ChevronDown, ChevronRight, Loader2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import { mlmService } from '@/services/mlmService';
import { supabase } from '@/lib/supabase';

interface TreeNodeProps {
  id: string;
  name: string;
  role: string;
  level: number;
  hasChildren?: boolean;
}

const TreeNode = ({ node, depth = 0 }: { node: TreeNodeProps; depth?: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [children, setChildren] = useState<TreeNodeProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleOpen = async () => {
    if (!isOpen && children.length === 0) {
      setIsLoading(true);
      try {
        const downline = await mlmService.getDownline(node.id);
        const mappedChildren = downline.map(child => ({
          id: child.id,
          name: `${child.first_name} ${child.last_name}`,
          role: child.role,
          level: depth + 1
        }));
        setChildren(mappedChildren);
      } catch (error) {
        console.error("Error fetching downline:", error);
      } finally {
        setIsLoading(false);
      }
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="ml-4 border-l-2 border-indigo-100 pl-6 py-2 relative">
      <div className="absolute left-0 top-8 w-6 h-0.5 bg-indigo-100"></div>
      
      <div 
        className={cn(
          "flex items-center gap-3 p-3 rounded-2xl transition-all cursor-pointer group",
          isOpen ? "bg-indigo-50/50" : "hover:bg-gray-50"
        )}
        onClick={toggleOpen}
      >
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-sm",
          depth === 0 ? "bg-indigo-600" : "bg-indigo-400"
        )}>
          {node.name[0]}
        </div>
        
        <div className="flex-1">
          <h4 className="text-sm font-bold text-gray-900">{node.name}</h4>
          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{node.role} • Level {depth}</p>
        </div>

        <div className="text-gray-400 group-hover:text-indigo-600 transition-colors">
          {isLoading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />
          )}
        </div>
      </div>

      {isOpen && children.length > 0 && (
        <div className="mt-2 space-y-1">
          {children.map((child) => (
            <TreeNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
      
      {isOpen && children.length === 0 && !isLoading && (
        <p className="ml-10 text-xs text-gray-400 py-2 italic">No downline members found.</p>
      )}
    </div>
  );
};

const GenealogyTree = () => {
  const [rootUser, setRootUser] = useState<TreeNodeProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoot = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('id, first_name, last_name, role')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          setRootUser({
            id: profile.id,
            name: `You (${profile.first_name} ${profile.last_name})`,
            role: profile.role,
            level: 0
          });
        }
      }
      setLoading(false);
    };

    fetchRoot();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!rootUser) return null;

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900">Genealogy Tree</h3>
        <p className="text-sm text-gray-500">Visualize your downline organization up to 9 levels.</p>
      </div>
      
      <div className="max-w-2xl">
        <TreeNode node={rootUser} depth={0} />
      </div>
    </div>
  );
};

export default GenealogyTree;
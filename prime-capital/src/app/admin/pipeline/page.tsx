'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { mockLeads, pipelineColumns } from '@/lib/mock-data';

type Lead = typeof mockLeads[number];

const statusMap: Record<string, string> = {
  'New Lead': 'New',
  'Contacted': 'Contacted',
  'Soft Pull Done': 'Soft Pull Done',
  'Approved': 'Approved',
  'Closed': 'Closed',
};

const reverseStatusMap: Record<string, string> = {
  'New': 'New Lead',
  'Contacted': 'Contacted',
  'Soft Pull Done': 'Soft Pull Done',
  'Qualified': 'Approved',
  'In Progress': 'Contacted',
  'Approved': 'Approved',
  'Closed': 'Closed',
  'Not Qualified': 'Closed',
};

const loanTypeColors: Record<string, string> = {
  'Hard Money Bridge': 'border-l-red-500',
  'Cash-Out Refinance': 'border-l-blue-500',
  'Rehab Loan': 'border-l-orange-500',
  'HELOC': 'border-l-purple-500',
  'Construction Loan': 'border-l-yellow-500',
  'Purchase': 'border-l-green-500',
  'Second Mortgage': 'border-l-pink-500',
};

const columnColors: Record<string, string> = {
  'New Lead': 'bg-green-500',
  'Contacted': 'bg-blue-500',
  'Soft Pull Done': 'bg-yellow-500',
  'Approved': 'bg-emerald-500',
  'Closed': 'bg-gray-500',
};

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

function daysInStage(submittedAt: string) {
  const diff = Date.now() - new Date(submittedAt).getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

function PipelineCard({ lead, isDragging }: { lead: Lead; isDragging?: boolean }) {
  const colorClass = loanTypeColors[lead.loanType] || 'border-l-gray-400';
  return (
    <div className={`bg-white rounded-lg border border-gray-200 border-l-4 ${colorClass} p-3 shadow-sm ${isDragging ? 'shadow-lg ring-2 ring-[#2d7a2d] opacity-90' : ''}`}>
      <p className="font-semibold text-gray-900 text-sm">{lead.name}</p>
      <p className="text-xs text-gray-500 mt-1">{lead.loanType}</p>
      <p className="text-xs text-gray-500">{lead.propertyType}</p>
      <div className="flex items-center justify-between mt-2">
        <span className="text-sm font-bold text-green-700">{formatCurrency(lead.desiredAmount)}</span>
        <span className="text-xs text-gray-400">{lead.ltv}% LTV</span>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{daysInStage(lead.submittedAt)}d in stage</span>
      </div>
    </div>
  );
}

function SortableCard({ lead }: { lead: Lead }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lead.id, data: { lead } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
      <PipelineCard lead={lead} />
    </div>
  );
}

function DroppableColumn({
  column,
  leads,
}: {
  column: { id: string; title: string };
  leads: Lead[];
}) {
  const dotColor = columnColors[column.id] || 'bg-gray-400';

  return (
    <div className="flex-1 min-w-[250px]">
      <div className="flex items-center gap-2 mb-3 px-1">
        <div className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
        <h3 className="font-semibold text-gray-800 text-sm">{column.title}</h3>
        <span className="text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full">{leads.length}</span>
      </div>
      <div className="bg-gray-100 rounded-xl p-2 min-h-[400px] space-y-2">
        <SortableContext items={leads.map((l) => l.id)} strategy={verticalListSortingStrategy}>
          {leads.map((lead) => (
            <SortableCard key={lead.id} lead={lead} />
          ))}
        </SortableContext>
        {leads.length === 0 && (
          <div className="flex items-center justify-center h-24 text-xs text-gray-400 border-2 border-dashed border-gray-300 rounded-lg">
            Drop leads here
          </div>
        )}
      </div>
    </div>
  );
}

export default function PipelinePage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  useEffect(() => {
    const stored = localStorage.getItem('pcg_leads');
    if (stored) {
      setLeads(JSON.parse(stored));
    } else {
      setLeads(mockLeads);
      localStorage.setItem('pcg_leads', JSON.stringify(mockLeads));
    }
  }, []);

  const getColumnLeads = useCallback(
    (columnId: string) => {
      return leads.filter((l) => {
        const mapped = reverseStatusMap[l.status] || 'New Lead';
        return mapped === columnId;
      });
    },
    [leads]
  );

  const getColumnForLead = (leadId: string): string => {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return 'New Lead';
    return reverseStatusMap[lead.status] || 'New Lead';
  };

  const activeLead = activeId ? leads.find((l) => l.id === activeId) : null;

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeLeadId = active.id as string;
    const overId = over.id as string;

    // Determine target column
    let targetColumn: string | null = null;

    // Check if dropped over a column directly
    const isColumn = pipelineColumns.some((c) => c.id === overId);
    if (isColumn) {
      targetColumn = overId;
    } else {
      // Dropped over another card - find which column that card belongs to
      targetColumn = getColumnForLead(overId);
    }

    if (!targetColumn) return;

    const newStatus = statusMap[targetColumn];
    if (!newStatus) return;

    const currentLead = leads.find((l) => l.id === activeLeadId);
    if (!currentLead) return;

    const currentColumn = reverseStatusMap[currentLead.status] || 'New Lead';
    if (currentColumn === targetColumn) return;

    const next = leads.map((l) =>
      l.id === activeLeadId ? { ...l, status: newStatus } : l
    );
    setLeads(next);
    localStorage.setItem('pcg_leads', JSON.stringify(next));
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeLeadId = active.id as string;
    const overId = over.id as string;

    // If dragging over a different column's card, update status in real-time
    const isColumn = pipelineColumns.some((c) => c.id === overId);
    if (isColumn) {
      const newStatus = statusMap[overId];
      if (!newStatus) return;
      const lead = leads.find((l) => l.id === activeLeadId);
      if (!lead) return;
      const currentColumn = reverseStatusMap[lead.status] || 'New Lead';
      if (currentColumn !== overId) {
        const next = leads.map((l) =>
          l.id === activeLeadId ? { ...l, status: newStatus } : l
        );
        setLeads(next);
      }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Pipeline</h2>
      <p className="text-sm text-gray-500">Drag and drop leads between columns to update their status.</p>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          {pipelineColumns.map((column) => (
            <DroppableColumn
              key={column.id}
              column={column}
              leads={getColumnLeads(column.id)}
            />
          ))}
        </div>
        <DragOverlay>
          {activeLead ? <PipelineCard lead={activeLead} isDragging /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

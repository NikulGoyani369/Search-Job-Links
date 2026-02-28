import React, { useState, useEffect } from 'react';
import type { TrackedJob } from '../../types';
import { PIPELINE_STEPS } from '../../data/mockData';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';

type Props = {
    trackedJobs: TrackedJob[];
    updateJobStatus: (id: string, newStatus: TrackedJob['status']) => void;
};

const MyApplications: React.FC<Props> = ({ trackedJobs, updateJobStatus }) => {
    // We need to disable StrictMode warning for react-beautiful-dnd, or just use it.
    // @hello-pangea/dnd works fine in React 18 strict mode.
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        updateJobStatus(draggableId, destination.droppableId as TrackedJob['status']);
    };

    if (!isBrowser) return null;

    return (
        <div className="dash-card applications-card" style={{ gridColumn: '1 / -1' }}>
            <div className="card-title">My Applications - Kanban Board
                <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-main)' }}>
                    <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.5rem', borderRadius: '5px', fontSize: '0.8rem', cursor: 'pointer' }}>⊞</span>
                    <span id="appCounter" style={{ background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: '5px', fontSize: '0.8rem', cursor: 'pointer' }}>{trackedJobs.length} ▼</span>
                </div>
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500, display: 'block', marginBottom: '1.5rem' }}>Drag and Drop to update pipeline stage</span>

            <DragDropContext onDragEnd={onDragEnd}>
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${PIPELINE_STEPS.length}, 1fr)`, gap: '1rem', minHeight: '400px' }}>
                    {PIPELINE_STEPS.map((step) => {
                        const jobsInStep = trackedJobs.filter(job => job.status === step);
                        return (
                            <Droppable droppableId={step} key={step}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        style={{
                                            background: snapshot.isDraggingOver ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.2)',
                                            borderRadius: '12px',
                                            padding: '1rem',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '0.8rem',
                                            border: '1px solid rgba(255,255,255,0.05)',
                                            transition: 'background 0.2s ease'
                                        }}
                                    >
                                        <div style={{ paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
                                            <span>{step}</span>
                                            <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '0.1rem 0.5rem', borderRadius: '10px' }}>{jobsInStep.length}</span>
                                        </div>
                                        {jobsInStep.map((job, index) => (
                                            <Draggable key={job.id} draggableId={job.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={{
                                                            userSelect: 'none',
                                                            padding: '1rem',
                                                            background: snapshot.isDragging ? 'rgba(79, 70, 229, 0.4)' : 'rgba(25, 25, 35, 0.8)',
                                                            border: '1px solid rgba(255,255,255,0.1)',
                                                            borderRadius: '8px',
                                                            color: 'var(--text-main)',
                                                            boxShadow: snapshot.isDragging ? '0 10px 20px rgba(0,0,0,0.5)' : 'none',
                                                            ...provided.draggableProps.style,
                                                        }}
                                                    >
                                                        <h4 style={{ margin: 0, fontSize: '0.9rem', marginBottom: '0.3rem' }}>{job.title}</h4>
                                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{job.company}</div>
                                                        <div style={{ fontSize: '0.7rem', color: '#06b6d4', marginTop: '0.5rem' }}>{job.dateStr}</div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        );
                    })}
                </div>
            </DragDropContext>
        </div>
    );
};

export default MyApplications;

export interface TestQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: 'concept' | 'code' | 'application' | 'analysis';
}

export interface Project {
  id: number;
  title: string;
  description: string;
  coreSkills: string[];
  dataset: string;
  learningGoals: string[];
  codeTemplate: string;
  tasks: string[];
  knowledgePoints: string[];
  commonMistakes: string[];
  level: '入门' | '进阶' | '实战';
  tools: string[];
}

export interface UserProgress {
  projectId: number;
  codeCompleted: boolean;
  codeSubmission: string;
}

export interface Dataset {
  id: string;
  name: string;
  filename: string;
  fields: FieldDefinition[];
  description: string;
  useCases: string[];
}

export interface FieldDefinition {
  name: string;
  type: string;
  description: string;
}

export interface CodeTemplate {
  id: string;
  name: string;
  code: string;
  description: string;
}

export interface KnowledgeDoc {
  id: string;
  title: string;
  content: string;
  category: 'cleaning' | 'analysis' | 'visualization' | 'ml';
}

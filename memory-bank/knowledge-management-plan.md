# Knowledge Management System Enhancement Plan

## Current Implementation

Currently, the training embeddings system works as follows:

1. **Default Training Data**: When clicking "Train Embeddings", the system uses predefined sample portfolio content from `src/lib/training.ts`. This includes hardcoded items like:
   - Project descriptions
   - Skill descriptions
   - Personal "About Me" content

2. **Process Flow**:
   - The system takes this hardcoded content
   - Chunks longer content into manageable sizes
   - Generates embeddings for each chunk using HuggingFace's API
   - Stores these embeddings in Supabase database

3. **Current Limitations**:
   - No way to upload custom documents
   - No way to remove specific knowledge pieces
   - No visibility into what's in the database
   - No control over training content beyond editing the code

## Enhancement Plan

### 1. Document Upload System

Create a document upload interface that allows:

```typescript
interface DocumentUpload {
  file: File;            // The actual file
  category: string;      // Document category (e.g., "project", "skill")
  title: string;         // Document title
  description?: string;  // Optional description
  tags?: string[];       // Optional tags for better organization
}
```

Implementation steps:
- Create a file upload component with drag-and-drop support
- Add form fields for metadata (title, category, tags)
- Parse uploaded files based on type (PDF, Markdown, Text, etc.)
- Preview extracted content before embedding

### 2. Knowledge Database Management

Expand the database schema to track individual documents:

```sql
CREATE TABLE documents (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  tags JSONB,
  file_path TEXT,
  file_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add document_id foreign key to embeddings table
ALTER TABLE embeddings ADD COLUMN document_id TEXT REFERENCES documents(id);
```

### 3. Knowledge Management Interface

Create a knowledge management dashboard with:
- List view of all uploaded documents
- Filter by category, tags, date
- Search functionality
- View document details
- Delete functionality for individual documents
- Ability to retrain/update specific documents

### 4. Document Processing Pipeline

Enhance the embedding pipeline:
1. **Document Parsing**: Extract text from various file formats (PDF, DOCX, MD, TXT)
2. **Text Preprocessing**: Clean text, handle special characters, normalize content
3. **Content Chunking**: Intelligent chunking based on document structure
4. **Metadata Extraction**: Automatically extract key information when possible
5. **Embedding Generation**: Create embeddings for each chunk
6. **Storage**: Store with proper relationship to source document

### 5. Knowledge Deletion & Cleanup

Implement proper deletion functionality:
- Delete a single document and all its associated embeddings
- Bulk delete functionality
- Archive capability (disable without deleting)
- Scheduling system for refreshing/updating embeddings

## Implementation Roadmap

### Phase 1: Basic Document Upload (1-2 days)
- Create file upload component
- Basic text extraction from simple formats
- Store raw documents and metadata

### Phase 2: Enhanced Embedding Pipeline (2-3 days)
- Improve chunking algorithm
- Add document-to-embedding relationships
- Implement better metadata handling

### Phase 3: Knowledge Management UI (2-3 days)
- List/grid view of documents
- Document details view
- Basic filtering and search

### Phase 4: Deletion & Maintenance (1-2 days)
- Implement proper deletion flows
- Add cleanup utilities
- Create maintenance jobs

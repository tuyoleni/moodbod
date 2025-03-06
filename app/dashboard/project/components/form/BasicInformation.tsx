import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FileWithPreview, Project } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProjectType } from '@/lib/types/enums';
import { useCallback, useState } from 'react';
import { Attachment } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ImagePlus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';

interface BasicInformationProps {
  formData: Partial<Project>;
  onFormChange: (updates: Partial<Project>) => void;
}

const MAX_FILES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function BasicInformation({ formData, onFormChange }: BasicInformationProps) {
  
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [error, setError] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError('');
    
    if (files.length + acceptedFiles.length > MAX_FILES) {
      setError(`You can only upload up to ${MAX_FILES} files`);
      return;
    }

    const newFiles = acceptedFiles.map(file => {
      if (file.size > MAX_FILE_SIZE) {
        setError('File size should not exceed 5MB');
        return null;
      }

      // Create FileWithPreview objects
      return Object.assign(file, {
        preview: URL.createObjectURL(file)
      });
    }).filter(Boolean) as FileWithPreview[];

    setFiles(prev => [...prev, ...newFiles]);
    onFormChange({ referenceImages: [...(formData.referenceImages || []), ...newFiles] });
  }, [files, formData.referenceImages, onFormChange]);

  const removeFile = (file: FileWithPreview) => {
    // Compare by preview URL instead
    const newFiles = files.filter(f => f.preview !== file.preview);
    setFiles(newFiles);
    onFormChange({ referenceImages: newFiles });
    URL.revokeObjectURL(file.preview);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxSize: MAX_FILE_SIZE
  });
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Project Details</h3>
        <Input
          placeholder="Project Name"
          value={formData.name}
          onChange={(e) => onFormChange({ name: e.target.value })}
          required
        />
        <Textarea
          placeholder="Project Description - Tell us about your project vision"
          value={formData.description}
          onChange={(e) => onFormChange({ description: e.target.value })}
          className="min-h-[100px]"
          required
        />
        <Select
          value={formData.type}
          onValueChange={(value) => onFormChange({ type: value as ProjectType })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Project Type" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(ProjectType).map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Project Goals</h3>
        <Textarea
          placeholder="What are the main goals you want to achieve with this project?"
          value={formData.projectGoals?.join('\n')}
          onChange={(e) => onFormChange({ projectGoals: e.target.value.split('\n').filter(Boolean) })}
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Target Audience</h3>
        <Textarea
          placeholder="Who is your target audience? What are their needs and preferences?"
          value={formData.targetAudience}
          onChange={(e) => onFormChange({ targetAudience: e.target.value })}
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Requirements</h3>
        <Textarea
          placeholder="List any specific requirements, features, or functionalities you need"
          value={formData.requirements}
          onChange={(e) => onFormChange({ requirements: e.target.value })}
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Inspiration & References</h3>
        <p className="text-sm text-muted-foreground">Share links to designs, websites, or examples that inspire you</p>
        <Textarea
          placeholder="Enter URLs or descriptions of your inspiration sources"
          value={formData.inspirationSources?.join('\n')}
          onChange={(e) => onFormChange({ inspirationSources: e.target.value.split('\n').filter(Boolean) })}
          className="min-h-[100px]"
        />
        
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Upload Reference Images</p>
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors",
              isDragActive ? "border-primary/50 bg-primary/5" : "border-muted-foreground/25"
            )}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-2 text-center">
              <ImagePlus className="h-8 w-8 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
                {isDragActive ? "Drop your images here" : "Drag & drop images here, or click to select"}
              </p>
              <p className="text-xs text-muted-foreground/75">
                Supported formats: JPEG, PNG, GIF (max 5MB each)
              </p>
            </div>
          </div>

          {error && (
            <p className="text-sm text-destructive mt-2">{error}</p>
          )}

          {files.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {files.map((file) => (
                <div key={file.name} className="group relative aspect-square rounded-lg border bg-background">
                  <Image
                    src={file.preview}
                    alt={file.name}
                    className="object-cover rounded-lg"
                    fill
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -right-2 -top-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFile(file)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { X, Loader2, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

interface AskQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  requirementId: string;
  requirementTitle: string;
}

export const AskQuestionModal: React.FC<AskQuestionModalProps> = ({
  isOpen,
  onClose,
  requirementId,
  requirementTitle,
}) => {
  const [subject, setSubject] = useState('');
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!subject.trim() || !question.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Question sent successfully!');
      setSubject('');
      setQuestion('');
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  const handleClose = () => {
    if (!isLoading) {
      setSubject('');
      setQuestion('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-[#16232A] flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-[#FF5B04]" />
                Ask a Question
              </DialogTitle>
              <DialogDescription className="mt-2 text-[#16232A]/60">
                Ask the customer about: {requirementTitle}
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-8 w-8"
              disabled={isLoading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <Label htmlFor="subject" className="text-sm font-medium text-[#16232A]">
              Subject
            </Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter question subject"
              className="mt-2"
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="question" className="text-sm font-medium text-[#16232A]">
              Your Question
            </Label>
            <Textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here..."
              className="mt-2 min-h-[150px]"
              disabled={isLoading}
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> The customer will receive your question and can respond directly. 
              You'll be notified when they reply.
            </p>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send Question
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

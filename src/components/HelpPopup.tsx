import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const HelpPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="fixed top-0 left-0 right-0 bg-destructive text-destructive-foreground text-center py-2 text-sm cursor-pointer z-50">
          Need help?
          <button className="ml-2 hover:opacity-80">×</button>
        </div>
      </DialogTrigger>
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-destructive">Need help?</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-muted-foreground text-center mb-4">
            If you're experiencing issues accessing your account, please contact our support team.
          </p>
          
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                console.log('Phone support clicked');
                setIsOpen(false);
              }}
            >
              📞 Call Support: 1800 REDBANK
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                console.log('Email support clicked');
                setIsOpen(false);
              }}
            >
              ✉️ Email Support
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                console.log('Live chat clicked');
                setIsOpen(false);
              }}
            >
              💬 Live Chat
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpPopup;
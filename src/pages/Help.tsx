import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginLayout from '@/components/LoginLayout';
import { BankingCard, BankingCardContent, BankingCardHeader, BankingCardTitle } from '@/components/ui/banking-card';
import { Button } from '@/components/ui/button';

const Help: React.FC = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "My hardware token has run out of battery. What should I do?",
      id: "battery"
    },
    {
      question: "I have forgotten my Organisation and/ or User ID. Where can I find them?",
      id: "credentials"
    },
    {
      question: "I have a new mobile device. How can I reactivate digital token?",
      id: "mobile"
    },
    {
      question: "I am experiencing issues activating soft token. What should I do?",
      id: "soft-token"
    }
  ];

  const handleFaqClick = (id: string) => {
    console.log('FAQ clicked:', id);
    // Handle FAQ navigation or expansion
  };

  return (
    <LoginLayout showLanguageSelector={false}>
      <div className="w-full space-y-6">
        {/* Fraud Support Section */}
        <BankingCard>
          <BankingCardHeader>
            <BankingCardTitle>Fraud related support</BankingCardTitle>
          </BankingCardHeader>
          
          <BankingCardContent>
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start h-12 text-left"
                onClick={() => console.log('Report fraud clicked')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-destructive flex items-center justify-center">
                    <span className="text-white text-xs">!</span>
                  </div>
                  <span>Report fraud</span>
                </div>
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start h-12 text-left"
                onClick={() => console.log('Block access clicked')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-xs">🔒</span>
                  </div>
                  <span>Block access to account(s)</span>
                </div>
              </Button>
            </div>
          </BankingCardContent>
        </BankingCard>

        {/* FAQ Section */}
        <BankingCard>
          <BankingCardHeader>
            <BankingCardTitle>Frequently asked questions (FAQs)</BankingCardTitle>
          </BankingCardHeader>
          
          <BankingCardContent>
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <Button
                  key={faq.id}
                  variant="ghost"
                  className="w-full justify-between h-auto p-4 text-left hover:bg-muted/50"
                  onClick={() => handleFaqClick(faq.id)}
                >
                  <span className="text-sm">{faq.question}</span>
                  <span className="text-muted-foreground">›</span>
                </Button>
              ))}
            </div>
            
            <div className="mt-6">
              <Button
                variant="link"
                className="text-primary hover:text-primary-hover p-0"
                onClick={() => console.log('View all FAQs clicked')}
              >
                View all FAQs
              </Button>
            </div>
          </BankingCardContent>
        </BankingCard>

        {/* Need Help Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => console.log('Need help clicked')}
          >
            <div className="w-4 h-4 rounded-full bg-muted-foreground text-white text-xs flex items-center justify-center">
              ?
            </div>
            Need help?
          </Button>
        </div>

        {/* Back to Login */}
        <div className="text-center">
          <Button
            variant="link"
            onClick={() => navigate('/')}
            className="text-primary hover:text-primary-hover"
          >
            ← Back to Login
          </Button>
        </div>
      </div>
    </LoginLayout>
  );
};

export default Help;
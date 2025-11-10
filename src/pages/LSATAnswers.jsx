import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { supabase } from '../lib/supabaseClient';

const LSATAnswers = () => {
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState(1);
  const [submittedReference, setSubmittedReference] = useState(null);

  // Fetch counter from Supabase on load
  React.useEffect(() => {
    const fetchCounter = async () => {
      try {
        const { data, error } = await supabase
          .from('lsat_counter')
          .select('count')
          .eq('id', 'laa')
          .single();

        if (error) {
          console.error('Supabase GET error:', error);
        } else if (data) {
          console.log('Current counter:', data.count);
          // Show the NEXT number that will be assigned (current + 1)
          setReferenceNumber(data.count + 1);
        }
      } catch (err) {
        console.error('Error fetching counter:', err);
      }
    };

    fetchCounter();
  }, []);

  const handleSubmit = async () => {
    if (question.trim()) {
      try {
        let currentRef = referenceNumber;
        
        // Increment counter in Supabase using RPC function
        try {
          const { data, error } = await supabase
            .rpc('increment_counter', { counter_id: 'laa' });

          if (error) {
            console.error('Supabase INCREMENT error:', error);
          } else {
            currentRef = data;
            console.log('Counter incremented to:', currentRef);
          }
        } catch (counterError) {
          console.error('Error incrementing counter:', counterError);
          currentRef = referenceNumber; // Use the displayed reference number
        }

        // Send email with EmailJS
        const emailData = {
          question: question,
          email: email || 'Not provided',
          reference: `LAA #${currentRef}`
        };
        
        console.log('Sending email with data:', emailData);
        
        await emailjs.send(
          'service_0yhiz5p',
          'template_8yz04gd',
          emailData,
          'vAlH0oPhePwpjdMFK'
        );
        
        setShowThankYou(true);
        setQuestion('');
        setEmail('');
        // Save the reference number that was just assigned
        setSubmittedReference(currentRef);
        // Update to show the NEXT reference number (current + 1)
        setReferenceNumber(currentRef + 1);
        
        setTimeout(() => setShowThankYou(false), 5000);
      } catch (error) {
        console.error('Error sending question:', error);
        alert('There was an error submitting your question. Please try again.');
      }
    }
  };

  const questionsAndAnswers = [
    {
      id: 1,
      question: "What's the biggest mistake you see students make after years of tutoring?",
      answer: "Some Patterns That Jump Out After 15 Years of Tutoring. Just a few reflections, slightly overstated. Take them for what they're worth. What I've observed from people coming to me from tutoring. Too many of you guys don't realize that the real world is going to try to get in the way of your LSAT studies and that it's going to succeed in doing so. The real world is going to get in the way. You can't avoid that. It's going to happen. You can be aware of that, and you can account for that in scheduling your studies. I've heard countless times, 'The biggest thing in my life over the next three months is the LSAT,' and every time I hear it I always believe it...",
      redditLink: "https://www.reddit.com/r/LSATAcademy/comments/1nvq1f1/laa_1_whats_the_biggest_mistake_you_see_students/"
    },
    {
      id: 2,
      question: "How do I approach sufficient assumption questions? I always get stuck between two answer choices.",
      answer: "There's a very simple formula for finding sufficient assumptions that is too often overlooked, and it's the very simple, 'If premise, then conclusion.' How does it work? Well, we need to start with some background information. An argument always has at least one premise and one conclusion. Here's a short argument: 'I'm hungry, so I should eat something.' Premise? 'Hungry.' Conclusion? 'Should Eat.' But that argument isn't perfect the way it is. If it seems perfect, that's because we're bringing in outside information. A space alien with perfect knowledge of logic, but no idea of the meaning of the words 'hungry' or 'eat,' wouldn't be convinced by that...",
      redditLink: "https://www.reddit.com/r/LSATAcademy/comments/1nvzxvn/laa_2_how_do_i_approach_sufficient_assumption/"
    },
    {
      id: 3,
      question: "Is LSAT tutoring worth it?",
      answer: "Spoiler: If You're Still Learning, Probably Not. I'm a tutor. I like money. But maybe you like hanging onto your money. And maybe you're wondering if you really need a tutor. It's a fair question. 'Do I Need a Tutor' In general: No. No one needs a tutor. Tutors are extravagances. They are indulgences, short cuts. When they're functioning properly, they can be of considerable help if the student's needs match the instructor's skills. Think of personal trainers: Almost everyone can workout on their own in general. Almost no one needs a personal trainer to work out. (Although personal trainers can be helpful in particular: for accountability, for very specific exercises...",
      redditLink: "https://www.reddit.com/r/LSATAcademy/comments/1nw0vq1/laa_3_is_lsat_tutoring_worth_it/"
    },
    {
      id: 4,
      question: "What's the most important thing to keep in mind when preparing for a law school application?",
      answer: "From studying for the LSAT to gathering recommendations and crafting your personal statement, applying to law school requires careful planning. Here's your comprehensive guide to navigating the process. Once you've decided to go to law school a lot of preparation needs to be done, so creating a timeline should be the first thing you should do. From studying for and achieving your LSAT score, getting personal statements from those professors that know you best, getting your transcripts, filling out the addenda for each particular law school, creating your personal statement—from first to final draft—all this requires planning and time...",
      redditLink: "https://www.reddit.com/r/LSATAcademy/comments/1nw1enb/laa_4_extremely_nervous_to_start_whats_the_most/"
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#EFF2F6',
      fontFamily: "'Poppins', sans-serif"
    }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(to right, #023247, #0578aa)',
        color: 'white',
        padding: '60px 20px 80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`,
          pointerEvents: 'none'
        }}></div>
        
        <div style={{
          position: 'relative',
          maxWidth: '800px',
          margin: '0 auto',
          zIndex: 1
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontFamily: "'Bree Serif', serif",
            fontWeight: '100',
            marginBottom: '20px',
            letterSpacing: '1px'
          }}>LSAT Academy Answers</h1>
          
          <p style={{
            fontSize: '1.3rem',
            marginBottom: '40px',
            opacity: 0.95,
            lineHeight: 1.6
          }}>
            Got an LSAT question? Get expert answers and personalized guidance from David McMaster
          </p>
          
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '30px',
            maxWidth: '600px',
            margin: '0 auto',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h3 style={{
              fontSize: '1.3rem',
              marginBottom: '15px',
              fontWeight: '500'
            }}>Ask Your Question Anonymously</h3>
            
            <p style={{
              fontSize: '0.95rem',
              marginBottom: '25px',
              opacity: 0.9,
              lineHeight: 1.5
            }}>
              Questions submitted below will be answered on the LSAT Academy subreddit by David with your reference number.
            </p>
            
            <div style={{
              background: 'rgba(255,255,255,0.15)',
              padding: '8px 15px',
              borderRadius: '8px',
              marginBottom: '15px',
              fontSize: '0.9rem',
              fontWeight: '500',
              textAlign: 'left'
            }}>
              Reference Number: LAA #{referenceNumber}
            </div>
            
            <textarea
              style={{
                width: '100%',
                minHeight: '120px',
                padding: '15px',
                borderRadius: '10px',
                border: 'none',
                fontSize: '1rem',
                fontFamily: "'Poppins', sans-serif",
                resize: 'vertical',
                marginBottom: '15px',
                color: '#023247',
                boxSizing: 'border-box'
              }}
              placeholder="Type your LSAT question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            
            <label style={{
              fontSize: '0.9rem',
              marginBottom: '8px',
              display: 'block',
              opacity: 0.9,
              textAlign: 'left'
            }}>
              Email (optional - get notified when your question is answered)
            </label>
            
            <input
              type="email"
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: '25px',
                border: 'none',
                fontSize: '1rem',
                fontFamily: "'Poppins', sans-serif",
                marginBottom: '20px',
                color: '#023247',
                boxSizing: 'border-box'
              }}
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <button 
                onClick={handleSubmit}
                style={{
                  background: 'linear-gradient(to right, #023247, #0578aa)',
                  color: 'white',
                  padding: '14px 40px',
                  borderRadius: '50px',
                  border: 'none',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
                  e.target.style.background = 'linear-gradient(to right, #035579, #069bdc)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                  e.target.style.background = 'linear-gradient(to right, #023247, #0578aa)';
                }}
              >
                Submit Question
              </button>
            </div>
            
            {showThankYou && (
              <div style={{
                background: 'rgba(255,255,255,0.2)',
                padding: '15px',
                borderRadius: '10px',
                marginTop: '15px',
                fontSize: '1rem'
              }}>
                ✓ Your question has been submitted as LAA #{submittedReference}! We'll review and answer it on Reddit soon.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reddit Community Callout */}
      <div style={{
        maxWidth: '1000px',
        margin: '60px auto 0',
        padding: '0 20px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #FF4500 0%, #FF5722 100%)',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 8px 24px rgba(255, 69, 0, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            flex: '1',
            minWidth: '250px'
          }}>
            <img 
              src="/assets/reddit-icon.png" 
              alt="Reddit Logo" 
              style={{
                width: '60px',
                height: '60px',
                filter: 'brightness(0) invert(1)'
              }}
            />
            <div>
              <h3 style={{
                fontSize: '1.8rem',
                fontFamily: "'Bree Serif', serif",
                fontWeight: '100',
                color: 'white',
                marginBottom: '8px'
              }}>Join Our Community</h3>
              <p style={{
                fontSize: '1.1rem',
                color: 'rgba(255,255,255,0.95)',
                margin: 0
              }}>
                Get daily LSAT tips, ask questions, and connect with fellow students
              </p>
            </div>
          </div>
          
          <a
            href="https://www.reddit.com/r/LSATAcademy/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'white',
              color: '#FF4500',
              padding: '14px 32px',
              borderRadius: '50px',
              border: 'none',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textDecoration: 'none',
              display: 'inline-block',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.25)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
          >
            Join r/LSATAcademy →
          </a>
        </div>
      </div>

      {/* Questions Section */}
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '60px 20px'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontFamily: "'Bree Serif', serif",
          fontWeight: '100',
          color: '#023247',
          textAlign: 'center',
          marginBottom: '40px'
        }}>Recent Questions & Answers</h2>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '25px'
        }}>
          {questionsAndAnswers.map(qa => (
            <div 
              key={qa.id} 
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '30px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
              }}
            >
              <div style={{
                color: '#999',
                fontSize: '0.95rem',
                marginBottom: '10px',
                fontStyle: 'italic'
              }}>Anonymous Student</div>
              
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#023247',
                marginBottom: '20px',
                lineHeight: 1.5
              }}>{qa.question}</h3>
              
              <div style={{
                background: 'linear-gradient(135deg, #f8f9fa, #ffffff)',
                padding: '20px',
                borderRadius: '15px',
                marginTop: '15px',
                borderLeft: '4px solid #2A8E9E'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '15px'
                }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#023247',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.85rem'
                  }}>
                    David McMaster • LSAT Expert
                  </span>
                </div>
                <p style={{
                  color: '#444',
                  fontSize: '1.1rem',
                  lineHeight: 1.7
                }}>{qa.answer}</p>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '20px',
                paddingTop: '20px',
                borderTop: '1px solid #e0e0e0'
              }}>
                <a 
                  href={qa.redditLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'linear-gradient(to right, #023247, #0578aa)',
                    color: 'white',
                    padding: '10px 24px',
                    borderRadius: '25px',
                    border: 'none',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    display: 'inline-block'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 15px rgba(0,0,0,0.3)';
                    e.target.style.background = 'linear-gradient(to right, #035579, #069bdc)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                    e.target.style.background = 'linear-gradient(to right, #023247, #0578aa)';
                  }}
                >
                  Read Full Answer on Reddit →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LSATAnswers;
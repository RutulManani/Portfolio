import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './Projects.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const projects = [
    {
      id: '1',
      title: "Airbnb UX Research",
      role: "UX Researcher & Designer, UI Designer",
      methodologies: ["Competitive analysis", "User Interviews", "Journey Mapping"],
      overview: "Our project goal was to improve the effectiveness of Airbnb's services by connecting people to unique travel experiences, facilitating stays in local homes, and cultivating a community where hosts may thrive.",
      hypothesis: "In our competitive analysis, we found the purchase path to be lacking, often preventing users from actually booking something. We believe if we talk to potential users about the ideal journey, they will come up with a more successful way to book an accommodation.",
      ethics: "Ethical standards were upheld during the research, with participants consenting to interviews and being informed about their rights and data privacy.",
      targetAudience: "Potential travellers between the age of 18-40 years",
      process: [
        {
          title: "Competitive Analysis",
          description: "We conducted a comparative analysis to evaluate Airbnb's usability against competitors like VRBO and Booking.com. This method provided valuable insights into industry standards, aiding in assessing Airbnb's performance."
        },
        {
          title: "User Interviews",
          description: "User interviews were conducted with 10 participants, chosen based on travel behaviors and demographics to gain qualitative data about user motivations and pain points."
        },
        {
          title: "Persona & Journey Map",
          description: "The insights from interviews were synthesized to create personas and journey maps, illustrating the user experience from awareness to engagement."
        }
      ],
      findings: [
        "Lack of description in listings",
        "Difficulty in locating specific features like apartments with multiple bathrooms",
        "Location accessibility requires booking to reveal exact location",
        "Overloaded navigation with heavy reliance on icons"
      ],
      solutions: [
        {
          title: "Verification Label",
          description: "Inserted a 'Verified' tag within the accommodation card, assuring users of authenticity."
        },
        {
          title: "Suggest Me Feature",
          description: "Personalized recommendation feature to help users find suitable accommodations based on preferences."
        },
        {
          title: "Detailed Descriptions",
          description: "Incorporating essential details like number of beds, bathrooms, and guest capacity upfront."
        }
      ],
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      takeaways: "Through design research on Airbnb, I delved into methodologies like competitive analysis and user interviews, uncovering invaluable insights about user needs and pain points."
    },
    {
      id: '2',
      title: "Prime Video Usability",
      role: "UX Designer, UI Designer",
      methodologies: ["Usability Testing", "Heuristic evaluation", "Affinity Mapping"],
      overview: "This project aimed to conduct thorough usability testing on Amazon Prime Video to uncover pain points and enhance user experience in the streaming landscape.",
      goals: "Assess the platform's usability, effectiveness, and user satisfaction across navigation, content discovery, watchlist management, and playback experience.",
      process: [
        {
          title: "Heuristic Evaluation",
          description: "Established usability standards and evaluated the website based on these criteria."
        },
        {
          title: "Usability Testing",
          description: "Assessed usability based on insights gathered from testing with real users."
        },
        {
          title: "Affinity Mapping",
          description: "Organized raw data into insights to inform design improvements."
        }
      ],
      findings: [
        "No distinct section for new releases",
        "Search bar doesn't retain previous search history",
        "Difficulty organizing watchlist items",
        "Unclear process for removing items from watchlist"
      ],
      solutions: [
        {
          title: "Content Listing",
          description: "Introduced streamlined categorization for easier browsing."
        },
        {
          title: "Content Details",
          description: "Added IMDb ratings and user likes indicators."
        },
        {
          title: "Watchlist Management",
          description: "Implemented new layout allowing multiple watchlists."
        }
      ],
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
      takeaways: "Gained insights into structured testing methods and refined communication skills through usability testing sessions."
    },
    {
      id: '3',
      title: "Byblos Restaurant",
      role: "UI/UX Designer",
      methodologies: ["User flows", "Paper Prototyping", "Wireframing"],
      overview: "Our objective was to streamline the ordering process for Byblos, providing customers with flexibility to place orders from anywhere.",
      problem: "The website solely provided a menu without ordering capability, limiting user engagement and transactional capabilities.",
      targetAudience: "Tourists, locals, students, families, and those interested in Eastern Mediterranean cuisine",
      process: [
        {
          title: "User Flow",
          description: "Mapped out the complete ordering journey from menu browsing to checkout."
        },
        {
          title: "Paper Prototyping",
          description: "Created initial low-fidelity prototypes for quick iteration."
        },
        {
          title: "User Testing",
          description: "Conducted tests with potential users to gather feedback on designs."
        }
      ],
      findings: [
        "Initial confusion about favorites button",
        "Need for better menu item grouping",
        "Preference for prices next to item names",
        "Oversized homepage layout"
      ],
      solutions: [
        {
          title: "Ordering System",
          description: "Implemented full online ordering with delivery/pickup options."
        },
        {
          title: "Menu Redesign",
          description: "Improved organization and added filtering options."
        },
        {
          title: "Visual Hierarchy",
          description: "Redesigned layout for better scanning and decision making."
        }
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      takeaways: "Streamlined checkout process through iterative design and user testing, maintaining consistency across platforms."
    },
    {
      id: '4',
      title: "Docmigo Hospital App",
      role: "UX Researcher & Designer, Graphic Designer",
      methodologies: ["Stakeholder interviews", "User surveys", "Journey Mapping"],
      overview: "Developed a communication and management app for doctors and receptionists to streamline hospital operations and minimize medical errors.",
      objectives: [
        "Reduce hospital expenses and operational inefficiency",
        "Minimize medical errors using technology",
        "Provide ideal end user experience for medical staff"
      ],
      painPoints: [
        "Inefficient operations with redundant information sharing",
        "Paper-based inventory tracking",
        "Communication gaps leading to medical errors",
        "Lack of financial support systems"
      ],
      process: [
        {
          title: "Competitive Analysis",
          description: "Evaluated existing hospital management systems to identify gaps."
        },
        {
          title: "User Surveys",
          description: "Surveyed clinics and hospitals to understand needs and usage patterns."
        },
        {
          title: "Information Architecture",
          description: "Structured the app's navigation and feature hierarchy."
        }
      ],
      solutions: [
        {
          title: "Appointment System",
          description: "Implemented pre-booking with calendar integration."
        },
        {
          title: "Patient Engagement",
          description: "Whatsapp integration for appointment management."
        },
        {
          title: "E-Prescriptions",
          description: "Digital prescription system with medical history."
        }
      ],
      image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      takeaways: "Gained experience in healthcare UX, stakeholder management, and complex system design with strict compliance requirements."
    }
  ];

  const project = projects.find(p => p.id === id);
  const currentIndex = projects.findIndex(p => p.id === id);
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  if (!project) {
    return <div className="container">Project not found</div>;
  }

  const handleBackToProjects = () => {
    navigate('/', { state: { scrollToProjects: true } });
  };

  return (
    <div className="project-detail">
      <div className="project-header">
        <div className="project-header-content container">
          <h1 className="project-title-large">{project.title}</h1>
          
          <div className="project-meta-grid">
            <div className="project-meta-item">
              <h3>My Role</h3>
              <p>{project.role}</p>
            </div>
            
            <div className="project-meta-item">
              <h3>Methodologies</h3>
              <div className="methodology-tags">
                {project.methodologies.map((method, index) => (
                  <span key={index} className="methodology-tag">{method}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="project-hero-image">
            <img src={project.image} alt={project.title} />
          </div>
        </div>
      </div>

      <div className="project-content container">
        <section className="project-section">
          <h2 className="project-section-title">Project Overview</h2>
          <p>{project.overview}</p>
          
          {project.hypothesis && (
            <>
              <h3 className="project-subtitle">Our Hypothesis</h3>
              <p>{project.hypothesis}</p>
            </>
          )}
          
          {project.ethics && (
            <>
              <h3 className="project-subtitle">Ethics and Data</h3>
              <p>{project.ethics}</p>
            </>
          )}
          
          {project.targetAudience && (
            <>
              <h3 className="project-subtitle">Target Audience</h3>
              <p>{project.targetAudience}</p>
            </>
          )}
          
          {project.problem && (
            <>
              <h3 className="project-subtitle">Problem Statement</h3>
              <p>{project.problem}</p>
            </>
          )}
          
          {project.objectives && (
            <>
              <h3 className="project-subtitle">Project Objectives</h3>
              <ul className="project-list">
                {project.objectives.map((obj, index) => (
                  <li key={index}>{obj}</li>
                ))}
              </ul>
            </>
          )}
          
          {project.painPoints && (
            <>
              <h3 className="project-subtitle">Key Pain Points</h3>
              <ul className="project-list">
                {project.painPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </>
          )}
        </section>

        <section className="project-section">
          <h2 className="project-section-title">Design Process</h2>
          <div className="process-steps">
            {project.process.map((step, index) => (
              <div key={index} className="process-step">
                <div className="step-number">{index + 1}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {project.findings && (
          <section className="project-section">
            <h2 className="project-section-title">Key Findings</h2>
            <ul className="project-list">
              {project.findings.map((finding, index) => (
                <li key={index}>{finding}</li>
              ))}
            </ul>
          </section>
        )}

        {project.solutions && (
          <section className="project-section">
            <h2 className="project-section-title">Solutions Implemented</h2>
            <div className="solutions-grid">
              {project.solutions.map((solution, index) => (
                <div key={index} className="solution-card">
                  <h3>{solution.title}</h3>
                  <p>{solution.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="project-section">
          <h2 className="project-section-title">Key Takeaways</h2>
          <p>{project.takeaways}</p>
        </section>

        <div className="project-navigation">
          <button onClick={handleBackToProjects} className="btn btn-secondary">
            <i className="fas fa-arrow-left"></i>
            <span>Back to Projects</span>
          </button>
          
          {nextProject && (
            <Link to={`/projects/${nextProject.id}`} className="btn btn-primary">
              <span>Next Project</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
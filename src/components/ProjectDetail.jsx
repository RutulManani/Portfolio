import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import './ProjectDetail.css'

// Import all Airbnb images
import airbnbMockup1 from '../assets/images/airbnb-mockup-1.png'
import airbnbMockup2 from '../assets/images/airbnb-mockup-2.png'
import airbnbMockup3 from '../assets/images/airbnb-mockup-3.png'
import airbnbMockup4 from '../assets/images/airbnb-mockup-4.png'
import airbnbMockup5 from '../assets/images/airbnb-mockup-5.png'
import airbnbMockup6 from '../assets/images/airbnb-mockup-6.png'
import airbnbMockup7 from '../assets/images/airbnb-mockup-7.png'

// Import all Prime Video images
import primeMockup1 from '../assets/images/prime-mockup-1.png'
import primeMockup2 from '../assets/images/prime-mockup-2.png'
import primeMockup3 from '../assets/images/prime-mockup-3.png'
import primeMockup4 from '../assets/images/prime-mockup-4.png'
import primeMockup5 from '../assets/images/prime-mockup-5.png'
import primeMockup6 from '../assets/images/prime-mockup-6.png'

// Import all Byblos images
import byblosMockup1 from '../assets/images/byblos-mockup-1.png'
import byblosMockup2 from '../assets/images/byblos-mockup-2.png'
import byblosMockup3 from '../assets/images/byblos-mockup-3.png'

// Import all Docmigo images
import docmigoMockup1 from '../assets/images/docmigo-mockup-1.png'
import docmigoMockup2 from '../assets/images/docmigo-mockup-2.png'
import docmigoMockup3 from '../assets/images/docmigo-mockup-3.png'
import docmigoMockup4 from '../assets/images/docmigo-mockup-4.png'
import docmigoMockup5 from '../assets/images/docmigo-mockup-5.png'
import docmigoMockup6 from '../assets/images/docmigo-mockup-6.png'
import docmigoMockup7 from '../assets/images/docmigo-mockup-7.png'
import docmigoMockup8 from '../assets/images/docmigo-mockup-8.png'
import docmigoMockup9 from '../assets/images/docmigo-mockup-9.png'
import docmigoMockup10 from '../assets/images/docmigo-mockup-10.png'
import docmigoMockup11 from '../assets/images/docmigo-mockup-11.png'
import docmigoMockup12 from '../assets/images/docmigo-mockup-12.png'
import docmigoMockup13 from '../assets/images/docmigo-mockup-13.png'
import docmigoMockup14 from '../assets/images/docmigo-mockup-14.png'
import docmigoMockup15 from '../assets/images/docmigo-mockup-15.png'
import docmigoMockup16 from '../assets/images/docmigo-mockup-16.png'
import docmigoMockup17 from '../assets/images/docmigo-mockup-17.png'
import docmigoMockup18 from '../assets/images/docmigo-mockup-18.png'
import docmigoMockup19 from '../assets/images/docmigo-mockup-19.png'
import docmigoMockup20 from '../assets/images/docmigo-mockup-20.png'
import docmigoMockup21 from '../assets/images/docmigo-mockup-21.png'
import docmigoMockup22 from '../assets/images/docmigo-mockup-22.png'
import docmigoMockup23 from '../assets/images/docmigo-mockup-23.png'
import docmigoMockup24 from '../assets/images/docmigo-mockup-24.png'
import docmigoMockup25 from '../assets/images/docmigo-mockup-25.png'
import docmigoMockup26 from '../assets/images/docmigo-mockup-26.png'
import docmigoMockup27 from '../assets/images/docmigo-mockup-27.png'
import docmigoMockup28 from '../assets/images/docmigo-mockup-28.png'
import docmigoMockup29 from '../assets/images/docmigo-mockup-29.png'
import docmigoMockup30 from '../assets/images/docmigo-mockup-30.png'
import docmigoMockup31 from '../assets/images/docmigo-mockup-31.png'
import docmigoMockup32 from '../assets/images/docmigo-mockup-32.png'
import docmigoMockup33 from '../assets/images/docmigo-mockup-33.png'

const ProjectDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(null)

  const projects = [
    {
      id: '1',
      title: 'Airbnb UX Research',
      role: 'UX Researcher & Designer, UI Designer',
      methodologies: [
        'Competitive analysis',
        'User Interviews',
        'Journey Mapping'
      ],
      overview:
        "Our project goal was to improve the effectiveness of Airbnb's services by connecting people to unique travel experiences, facilitating stays in local homes, and cultivating a community where hosts may thrive.",
      problem:
        'In our competitive analysis, we found the purchase path to be lacking, often preventing users from actually booking something.',
      targetAudience: 'Potential travellers between the age of 18-40 years',
      process: [
        {
          title: 'Research',
          description:
            "In the initial research phase, we conducted a comparative analysis to evaluate Airbnb's usability against competitors like VRBO and Booking.com. This method provided valuable insights into industry standards, aiding in assessing Airbnb's performance and aligning with business goals and usability heuristics.",
          image: 'https://i.ibb.co/PvpTP1Nq/Frame-1-1.png'
        },
        {
          title: 'Analysis',
          description:
            "Following this, user interviews were conducted with 10 participants, chosen based on travel behaviors and demographics. This approach aimed to gain qualitative data about user motivations, pain points, and decision-making processes within Airbnb's purchase path.",
          image: 'https://i.ibb.co/svsSz5Hb/interview.jpg'
        },
        {
          title: 'Synthesis',
          description:
            'The insights from these interviews were synthesized to create personas and journey maps, illustrating the user experience from awareness to engagement. These maps highlighted user task paths, emotional responses, pain points, and opportunities for improvement.',
          image: 'https://i.ibb.co/nMdgN0fq/Slide-16-9-5.jpg'
        }
      ],
      solutions: [
        {
          title: 'Verified Listings',
          description:
            "Implemented 'Verified' tags to increase trust in accommodations."
        },
        {
          title: 'Recommendations',
          description: "Added 'Suggest Me' feature based on user preferences."
        },
        {
          title: 'Compare Listings',
          description:
            'Allows users to view multiple accommodations side by side.'
        }
      ],
      mockups: [
        airbnbMockup1,
        airbnbMockup2,
        airbnbMockup3,
        airbnbMockup4,
        airbnbMockup5,
        airbnbMockup6,
        airbnbMockup7
      ],
      results: [
        'Improved Booking Confidence',
        'Smarter Discovery Tools',
        'Reduced support queries about listing details'
      ],
      takeaways: [
        'Importance of thorough competitive analysis',
        'Value of direct user feedback in shaping solutions',
        'Need for clear information architecture in complex platforms'
      ],
      heroImage: 'https://i.ibb.co/v6g5TZKK/i-Phone-14-Pro-Max-14.jpg'
    },
    {
      id: '2',
      title: 'Prime Video Usability',
      role: 'UX Designer, UI Designer',
      methodologies: [
        'Usability Testing',
        'Heuristic evaluation',
        'Affinity Mapping'
      ],
      overview:
        'This project aimed to conduct thorough usability testing on Amazon Prime Video to uncover pain points and enhance user experience in the streaming landscape.',
      problem:
        'Users struggled with content discovery, watchlist management, and navigation efficiency.',
      targetAudience: 'Streaming service users aged 18-55',
      process: [
        {
          title: 'Evaluation',
          description:
            'Heuristic evaluation uncovered key usability gaps in content discovery and watchlist management. Users had trouble finding new content, filtering by mood or genre, and removing saved items—highlighting the need for better user control and smarter navigation.',
          image: 'https://i.ibb.co/hxggJcSg/Testing.png'
        },
        {
          title: 'Testing',
          description:
            'We conducted usability testing with six diverse users using screen recordings and observation. This revealed how users interacted with Amazon Prime Video, helping us identify common issues and prioritize improvements based on real behavior and feedback.',
          image: 'https://i.ibb.co/Z6LtRdCW/Laptop.png'
        },
        {
          title: 'Analysis',
          description:
            'The analysis revealed critical problems with content layout, limited details, and disorganized watchlist features. Poor recommendations and missing search history support further impacted the user journey, calling for more personalized and efficient experiences.',
          image: 'https://i.ibb.co/Z6jD3MbJ/Screenshot-881.png'
        }
      ],
      solutions: [
        {
          title: 'Improved Navigation',
          description:
            'Redesigned information architecture for better content discovery.'
        },
        {
          title: 'Watchlist Management',
          description: 'Added functionality to create multiple watchlists.'
        },
        {
          title: 'Content Details',
          description: 'Enhanced movie/show pages with more metadata.'
        }
      ],
      mockups: [
        primeMockup1,
        primeMockup2,
        primeMockup3,
        primeMockup4,
        primeMockup5,
        primeMockup6
      ],
      results: [
        '25% improvement in task completion rates',
        'Higher user satisfaction scores',
        'Reduced bounce rate from content pages'
      ],
      takeaways: [
        'Streaming platforms need clear content hierarchies',
        'Personalization significantly impacts engagement',
        'Testing with real users reveals unexpected insights'
      ],
      heroImage: 'https://i.ibb.co/fYDG6MkK/Image0001.jpg'
    },
    {
      id: '3',
      title: 'Byblos Restaurant',
      role: 'UI/UX Designer',
      methodologies: ['User flows', 'Paper Prototyping', 'Wireframing'],
      overview:
        'Our objective was to streamline the ordering process for Byblos, providing customers with flexibility to place orders from anywhere.',
      problem:
        'The website solely provided a menu without ordering capability, limiting user engagement and transactional capabilities.',
      targetAudience:
        'Tourists, locals, students, families interested in Eastern Mediterranean cuisine',
      process: [
        {
          title: 'Discovery',
          description:
            'Interviewed restaurant staff and customers to understand needs and the user flow for ordering an item.',
          image: 'https://i.ibb.co/3Y4Qrxcd/user-flow.png'
        },
        {
          title: 'Prototyping',
          description:
            'Created paper prototypes for quick iteration and feedback.',
          image: 'https://i.ibb.co/Q39t3pzM/prototype.png'
        },
        {
          title: 'User Testing',
          description:
            'Users liked core features but suggested clearer icons, better menu organization, shorter text, and more imagery—especially on the homepage. Visual cues and layout adjustments were recommended to improve clarity and navigation.',
          image:
            'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80'
        }
      ],
      solutions: [
        {
          title: 'Online Ordering',
          description:
            'Implemented full online ordering with delivery/pickup options.'
        },
        {
          title: 'Menu Redesign',
          description: 'Improved organization and added filtering options.'
        },
        {
          title: 'Checkout Flow',
          description: 'Streamlined payment process for faster transactions.'
        }
      ],
      mockups: [byblosMockup1, byblosMockup2, byblosMockup3],
      results: [
        '40% increase in online orders',
        'Higher average order value',
        'Enhanced brand presence in the market'
      ],
      takeaways: [
        'Food ordering requires clear visual hierarchy',
        'Mobile-first design is essential for restaurant sites',
        'Reducing steps in checkout increases conversions'
      ],
      heroImage: 'https://i.ibb.co/pBd0bdBg/4153267-89559.jpg'
    },
    {
      id: '4',
      title: 'Docmigo Hospital App',
      role: 'UX Researcher & Designer, Graphic Designer',
      methodologies: [
        'Stakeholder interviews',
        'User surveys',
        'Journey Mapping'
      ],
      overview:
        'Developed a communication and management app for doctors and receptionists to streamline hospital operations and minimize medical errors.',
      problem:
        'Inefficient operations with redundant information sharing and communication gaps leading to medical errors.',
      targetAudience: 'Doctors, nurses, and administrative staff in hospitals',
      process: [
        {
          title: 'Research',
          description:
            'Key issues identified are Patients experience delays and reduced care quality due to poor communication with doctors, lack of financial support, and underutilized clinical data. Additionally, access issues caused by age, transportation, or long wait times further impact treatment outcomes.',
          image: 'https://i.ibb.co/Pv9DDdzF/research.png'
        },
        {
          title: 'Analysis',
          description:
            'Created persona maps highlighting critical communication breakdowns.',
          image: 'https://i.ibb.co/hxm2qzLX/persona-2.png'
        },
        {
          title: 'Design',
          description: 'Developed wireframes focusing on critical workflows.',
          image: 'https://i.ibb.co/qYL0K7Jj/wireframe.png'
        }
      ],
      solutions: [
        {
          title: 'Appointment System',
          description: 'Implemented pre-booking with calendar integration.'
        },
        {
          title: 'Patient Engagement',
          description:
            'Integration NDHM for appointment management and patient summary.'
        },
        {
          title: 'E-Prescriptions',
          description: 'Digital prescription system with medical history.'
        }
      ],
      mockups: [
        docmigoMockup1,
        docmigoMockup2,
        docmigoMockup3,
        docmigoMockup4,
        docmigoMockup5,
        docmigoMockup6,
        docmigoMockup7,
        docmigoMockup8,
        docmigoMockup9,
        docmigoMockup10,
        docmigoMockup11,
        docmigoMockup12,
        docmigoMockup13,
        docmigoMockup14,
        docmigoMockup15,
        docmigoMockup16,
        docmigoMockup17,
        docmigoMockup18,
        docmigoMockup19,
        docmigoMockup20,
        docmigoMockup21,
        docmigoMockup22,
        docmigoMockup23,
        docmigoMockup24,
        docmigoMockup25,
        docmigoMockup26,
        docmigoMockup27,
        docmigoMockup28,
        docmigoMockup29,
        docmigoMockup30,
        docmigoMockup31,
        docmigoMockup32,
        docmigoMockup33
      ],
      results: [
        'Reduced appointment no-shows by 35%',
        'Decreased prescription errors by 50%',
        'Improved staff satisfaction scores'
      ],
      takeaways: [
        'Healthcare UX requires rigorous testing',
        'Stakeholder buy-in is crucial for adoption',
        'Error prevention must be primary focus in medical apps'
      ],
      heroImage: 'https://i.ibb.co/CK1DV0qH/docm.jpg'
    }
  ]

  const project = projects.find(p => p.id === id)
  const currentIndex = projects.findIndex(p => p.id === id)
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  if (!project) {
    return <div className='container'>Project not found</div>
  }

  const handleBackToProjects = () => {
    navigate('/', { state: { scrollToProjects: true } })
  }

  const openImageModal = imageUrl => {
    setSelectedImage(imageUrl)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  return (
    <div className='project-detail'>
      {/* Hero Section */}
      <section className='project-hero'>
        <div className='hero-image-container'>
          <img
            src={project.heroImage}
            alt={project.title}
            className='hero-image'
          />
          <div className='hero-overlay'></div>
        </div>
        <div className='hero-content-p container'>
          <h1 className='hero-title'>{project.title}</h1>
          <p className='hero-outcome'>
            Key Outcome:{' '}
            {project.results ? project.results[0] : 'Improved user experience'}
          </p>
        </div>
      </section>

      {/* Project Content */}
      <div className='project-content-p container'>
        {/* Problem Setup */}
        <section className='project-section'>
          <h2 className='section-title'>Problem Setup</h2>
          <div className='problem-grid'>
            <div className='problem-card'>
              <h3>Client</h3>
              <p>{project.title.split(' ')[0]}</p>
            </div>
            <div className='problem-card'>
              <h3>Target Audience</h3>
              <p>{project.targetAudience}</p>
            </div>
            <div className='problem-card'>
              <h3>Core Problem</h3>
              <p>{project.problem}</p>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className='project-section'>
          <h2 className='section-title'>My Process</h2>
          <div className='process-timeline'>
            {project.process.map((step, index) => (
              <div key={index} className='process-step'>
                <div className='step-number'>{index + 1}</div>
                <div className='step-content'>
                  <div
                    className='step-image-container'
                    onClick={() => openImageModal(step.image)}
                  >
                    <img
                      src={step.image}
                      alt={step.title}
                      className='step-image'
                    />
                  </div>
                  <div className='step-text'>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Solutions */}
        <section className='project-section'>
          <h2 className='section-title'>Solutions Implemented</h2>
          <div className='solutions-grid'>
            {project.solutions.map((solution, index) => (
              <div key={index} className='solution-card'>
                <div className='solution-number'>0{index + 1}</div>
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mockups Section */}
        {project.mockups && project.mockups.length > 0 && (
          <section className='project-section'>
            <h2 className='section-title'>Design Mockups</h2>
            <div className='mockups-grid'>
              {project.mockups.map((mockup, index) => (
                <div
                  key={index}
                  className='mockup-item'
                  onClick={() => openImageModal(mockup)}
                >
                  <img
                    src={mockup}
                    alt={`${project.title} Mockup ${index + 1}`}
                    className='mockup-image'
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Results */}
        {project.results && (
          <section className='project-section'>
            <h2 className='section-title'>Final Results</h2>
            <ul className='results-list'>
              {project.results.map((result, index) => (
                <li key={index} className='result-item'>
                  <span className='result-bullet'></span>
                  {result}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Takeaways */}
        <section className='project-section'>
          <h2 className='section-title'>Key Takeaways</h2>
          <div className='takeaways-grid'>
            {project.takeaways.map((takeaway, index) => (
              <div key={index} className='takeaway-card'>
                <div className='takeaway-number'>#{index + 1}</div>
                <p>{takeaway}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <div className='project-navigation'>
          <button onClick={handleBackToProjects} className='btn btn-secondary'>
            <i className='fas fa-arrow-left'></i>
            <span>Back to Projects</span>
          </button>

          {nextProject && (
            <Link
              to={`/projects/${nextProject.id}`}
              className='btn btn-primary'
            >
              <span>Next Project</span>
              <i className='fas fa-arrow-right'></i>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AirbnbProject from './projects/AirbnbProject';
import ByblosProject from './projects/ByblosProject';
import DocmigoProject from './projects/DocmigoProject';
import SpendSmartProject from './projects/SpendSmartProject';
import '../components/ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const renderProject = () => {
    switch(id) {
      case '1':
        return <AirbnbProject />;
      case '2':
        return <ByblosProject />;
      case '3':
        return <DocmigoProject />;
      case '4':
      case 'spendsmart':
        return <SpendSmartProject />;
      default:
        return (
          <div className="container" style={{ padding: '8rem 5%', textAlign: 'center' }}>
            <h2>Project not found</h2>
            <button 
              onClick={() => navigate('/')} 
              className="btn btn-primary"
              style={{ marginTop: '2rem' }}
            >
              Back to Home
            </button>
          </div>
        );
    }
  };

  return (
    <div className="project-detail">
      {renderProject()}
    </div>
  );
};

export default ProjectDetail;
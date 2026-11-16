import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AirbnbProject from './projects/AirbnbProject';
import SpendSmartProject from './projects/SpendSmartProject';
import LocusProject from './projects/LocusProject';
import VeritasProject from './projects/VeritasProject';
import '../components/ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const renderProject = () => {
    switch(id) {
      case '1':
        return <AirbnbProject />;
      case '4':
      case 'spendsmart':
        return <SpendSmartProject />;
      case '5':
      case 'locus':
        return <LocusProject />;
            case '6':
      case 'veritas':
        return <VeritasProject />;  
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
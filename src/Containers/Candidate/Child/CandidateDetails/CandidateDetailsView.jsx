
import { Component } from "react";
import { Link } from 'react-router-dom';

class CandidateDetailsView extends Component {
  render() {
    return (
      <>
       <Link
  to={`/candidate/${this.props.candidateId}`}
  className="candidate-link"
>
  {this.props.candidateName}
</Link>
      </>
    );
  }
}
export default CandidateDetailsView;

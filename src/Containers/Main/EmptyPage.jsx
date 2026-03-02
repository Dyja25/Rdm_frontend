import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FWLogo from "../../assets/Images/image 21.jpg";

const EmptyPage = (props) => {return (
        <>
      <div className="flex flex-col justify-center items-center max-md: !h-[36vh] max-sm:h-[20rem]">         
           <img
                  className="w-44 h-44 max-sm:w-8 max-sm:h-8"
                  src={FWLogo}
                  alt="Tekorero logo"
                /> 
               <div className=" text-base font-poppins  font-semibold">Nothing there for now</div>
  <div
    className="text-xs cursor-pointer  font-Poppins font-medium"
  >
      Create a new one to get Started.
  </div>
   </div>        
        </>
    );
}
const mapStateToProps = ({ auth}) => ({

});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
           
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmptyPage);

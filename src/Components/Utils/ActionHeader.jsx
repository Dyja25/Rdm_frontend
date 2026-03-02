import PropTypes from 'prop-types';


const ActionHeader = (props) => {
    return (
        <div class="h-10  pt-1 flex justify-between items-center content-center w-wk  shadow-md max-sm:w-full ">
            <div className='flex  max-sm:w-wk'>{props.leftComponent}</div>
            <div className='flex  max-sm:w-wk max-sm:justify-end'>{props.rightComponent}</div>
        </div>
    )
}
ActionHeader.propTypes = {
    leftComponent: PropTypes.element,
    rightComponent: PropTypes.element
}
export default  ActionHeader;

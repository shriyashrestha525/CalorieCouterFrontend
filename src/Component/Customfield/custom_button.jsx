import '../../style/custom_submit_button.css'
const CustomSubmitButton = ({ value, onClick }) => {
    return (
        <div id="custom-button">
            <input id="cus-button" type="submit" value={value} onClick={onClick} />
        </div>
    )
}

export default CustomSubmitButton
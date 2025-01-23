import './Background.css'
import image1 from '../../assets/calorieb.jpg'
import image2 from '../../assets/caloriec.jpg'
import image3 from '../../assets/caloriea.jpg'
import image4 from '../../assets/caloried.jpg'
const Background = ({ playStatus, calorieAdd }) => {
    if (playStatus) {
        return <img src={image1} className='Background' alt='' />
    }
    else if (calorieAdd === 0) {
        return <img src={image2} className='Background' alt="" />
    }
    else if (calorieAdd === 1) {
        return <img src={image3} className='Background' alt="" />
    }
    else if (calorieAdd === 2) {
        return <img src={image4} className='Background' alt="" />
    }
}
export default Background
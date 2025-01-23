import './Caloriefood.css'
import arrow1 from '../../assets/arrow1.png';
import { useNavigate } from 'react-router-dom';

const Caloriefood = ({ calorieData }) => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/imagerecognization');
    };
    return (
        <div className='caloriefood'>
            <div className="calorie-text">
                <p>{calorieData.text1}</p>
                <p>{calorieData.text2}</p>
                <p>{calorieData.text3}</p>
            </div>
            <div className="calorie-explore" onClick={handleNavigate}>
                <p>Calculate your Calorie</p>
                <img src={arrow1} alt="Arrow" className='arrow-icon' />

            </div>
        </div>
    )
}
export default Caloriefood
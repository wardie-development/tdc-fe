import './styles/CompatibilityBrandsTitle.css';
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';

export const CompatibilityBrandsTitle = ({screenProtector}) => {
  return (
    <div className='compatibilitiesTitleGroup' style={{backgroundColor: screenProtector.color}}>
      <AddToHomeScreenIcon style={{color:'#fff'}}/>
      <p className='compatibilitiesTitleGroup__title'>{screenProtector.title}</p>
    </div>
  );
}

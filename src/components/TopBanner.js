import bannerLogo from '../images/drs_hooley_horizontal.png';

const TopBanner = () => {

  return (
    <div className="top-banner">
      <img src={bannerLogo} alt="Dr. Squatch's logo but with an added Hooley" />
      <h1>Bundle Collections</h1>
    </div>
  )
}

export default TopBanner
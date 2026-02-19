import { useState, useEffect } from 'react'
import axios from 'axios'
import './About.css'

const About = () => {
  const [aboutData, setAboutData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/about`)
        setAboutData(response.data)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch about data:', err)
        setError('Failed to load about page data')
      } finally {
        setLoading(false)
      }
    }

    fetchAboutData()
  }, [])

  if (loading) {
    return <div className="About-loading">Loading...</div>
  }

  if (error) {
    return <div className="About-error">{error}</div>
  }

  return (
    <div className="About">
      <h1>{aboutData?.title}</h1>
      <div className="About-content">
        <img src={aboutData?.imageUrl} alt="About Us" className="About-image" />
        <div className="About-text">
          {aboutData?.paragraphs?.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About

import { useState } from 'react';
import { connect } from 'react-redux';
import backgroundImage from './pictures/bgimage.jpeg';
import Carousel from '../components/Carousel/Carousel'

const About = (props) => {
    const styles = {
        container: {
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            fontFamily: 'VictorMono-Oblique',
        },
        heading: {
            color: 'white',
            marginTop: '10vh',
        },
        article: {
            color: 'white',
            fontFamily: 'VictorMono-Oblique',
            width: '49vw',
            display: 'inline-block',
            marginLeft: '2vw',
            float: 'left',
        },
        aside: {
            color: 'white',
            fontFamily: 'VictorMono-Oblique',
            width: '49vw',
            float: 'right',
            marginTop: '10vh',
        },
        link: {
            color: 'white',
            textDecoration: 'none',
        },
    };
    const [rendered, setRendered] = useState({});
    const projects = [
        {
            name: 'Redditly',
            description: `A Reddit client with a different rendering than the usual Reddit tm`
        },
        {
            name: 'Jammming',
            description: `A spotify playlist making web-app`
        },
        {
            name: 'First Portfolio Project',
        },
        {
            name: 'Second Portfolio Project',
        },
    ];

    const renderProjects = project => {
        return (
            <li key={project.name}>
                <a
                style={styles.link}
                href={project.link}
                onClick={() => {
                    setRendered(project);
                    console.log(project);
                }}
                >
                    {project.name}
                </a>
            </li>
        )
    };

    return (
        <div style={styles.container}>
            <div>
                <article style={styles.article}>
                    <h3 style={styles.heading}>About me:</h3>
                    My name is Omri Jukin,<br />
                    I'm 25 years old fullstack developer and certified electrician.<br />
                    <br />
                    <br />
                    Currently searching for my entry level job as a junior developer.<br />
                    This is the first fullstack application i've written.<br />
                    Alogn the way there were few front-end only applications such as:<br />
                    <ul>
                        {(projects || []).map(renderProjects)}
                    </ul>
                </article>
                <aside style={styles.aside}>
                    {rendered ?
                    <div>
                        <h4>{rendered.name}</h4>
                        <br />
                        <p>{rendered.description}</p>
                    </div>
                    :
                    <></>}
                </aside>
            </div>
            <Carousel />
        </div>
    )
}

export default connect(state => state)(About)
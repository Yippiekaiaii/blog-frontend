import useTitle from "../hooks/useTitle"

const About =() => {
    useTitle('Blog: About')
    const content = (
        <>
        <div className="box_wrapper">
            <h3>About this blog</h3>
            <p>This blog was originally made as a learning project and to show my web development skills.</p>
            <p>As a demonstration of the MERN stack it uses React to connect to a NodeJS API that in turn accesses a MongoDB database.</p>
            <p>It incorporates Redux to handle state management, using RTK query to fetch the data</p>
            <p>The site has full user authentication and role based authorisation.</p>
            <p>If you would like to know more or would like to get in touch please email me <a href="mailto:peter.wilson12@notmail.co.uk">here</a></p>
        </div>
        </>
    )

    return content
}

export default About
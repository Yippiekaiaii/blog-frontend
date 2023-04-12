import useTitle from "../hooks/useTitle"

const About =() => {
    useTitle('Blog: About')
    const content = (
        <>
        <div className="box_wrapper">
            <h3>About this blog</h3>
            <p>This blog was originally made as a learning project and to show my web development skills.</p>
            <p>As a demonstration of the MERN stack it uses React to connect to a NodeJS API that in turn accesses a MongoDB database.</p>
            <p>State is handled by Redux.</p>
            <p>The site has full user authentication and role based authorisation.</p>
        </div>
        </>
    )

    return content
}

export default About
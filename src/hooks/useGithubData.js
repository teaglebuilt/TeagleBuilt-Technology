import { graphql, useStaticQuery } from "gatsby";



const useGithub = () => {
    const data = useStaticQuery(graphql`
        query {
            allRepoNode {
                edges {
                    node {
                        id
                        readme
                        name
                        languages {
                            JavaScript
                            CSS
                            HTML
                            Shell
                            TypeScript
                            Python
                            Batchfile
                            Dockerfile
                        }
                    url
                    description
                }
            }
        }
    }
    `);
    return data.allRepoNode.edges;
}

export default useGithub
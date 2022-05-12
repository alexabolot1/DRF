import {useParams} from 'react-router-dom'
import React from "react";


const ProjectItem = ({project}) => {
   return (
       <tr>
           <td>
               {project.name}
           </td>
           <td>
               {project.link}
           </td>
           <td>
               {project.users}
           </td>
       </tr>
   )
}


const ProjectsInfo = ({projects}) => {
    let {id} = useParams()
    let filteredProjects= projects.filter((project) => parseInt(project.id) === parseInt(id))

    return (
        <table>
           <th>
               Name
           </th>
           <th>
               Link
           </th>
           <th>
               Users
           </th>
           {filteredProjects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}

export default ProjectsInfo
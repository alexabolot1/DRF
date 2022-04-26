import React from 'react'
import {Link} from "react-router-dom";

const ProjectItem = ({project, deleteProject}) => {
   return (
       <tr>
           <td>
               <Link to={`/projects/${project.id}`} > {project.name}</Link>
           </td>
           <td>
               {project.link}
           </td>
           <td>
               {project.users}
           </td>
           <td>
               <button onClick={() => deleteProject(project.id)} type='button'>Delete</button>
           </td>
       </tr>
   )
}

const ProjectList = ({projects, deleteProject}) => {
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
           {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
       </table>
   )
}

export default ProjectList

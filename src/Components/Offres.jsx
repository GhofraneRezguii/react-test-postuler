import React from 'react';
import JobCard from './JobCard';
import './JobCard.css';



function Offres() {
  const Jobs = [
    {
      title: "Consultant Sécurité Technique",
      département: "Sécurité des Systèmes d’Information",
      dateSoumission: "09/25/2023",
      dateExpiration:"12/04/2027",
      description:"Participez à la protection des systèmes d'information en apportant votre expertise technique en cybersécurité.",
      status:"Valable",
      image: "https://static.vitrine.ynov.com/cdn-cgi/image/width=650,height=363,fit=cover,format=auto/var/site/storage/images/9/0/6/4/54609-1-fre-FR/d54d1083b18a-consultant-cybersecurite.jpg"
    },
    {
      title: "Expert Stockage",
      département: "Infrastructure Systèmes et Réseaux",
      dateSoumission: "14/02/2019",
      dateExpiration:"",
      description:"Participez à la migration NAS et à l’automatisation sécurisée en tant qu’expert en stockage..",
      status:"Valable",
      image: "https://media.licdn.com/dms/image/v2/C4D12AQHTHlR4K5JCNQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1520190197673?e=2147483647&v=beta&t=-bL6rGa9uLbpWwCw9FK1c93iAsy5CcZKRLQ6zivHSVo"
    },
    {
      title: "Ingénieur Stockage/Backup (H/F)",
      département: "Infrastructure Stockage et Sauvegarde",
      dateSoumission: "23/03/2022",
      dateExpiration:"",
      description:"Assurer la validation et la réalisation de POC pour des solutions avancées de sauvegarde et restauration dans un environnement multi-cloud..",
      status:"Valable",
      image: "https://fininfosolutions.com/wp-content/uploads/2022/04/software-developer-web-developer-programmer-6521720-300x200.jpg"
    },
    {
      title: "Développeur Front end ",
      département: "Développement Web",
      dateSoumission: "09/11/2019",
      dateExpiration:"",
      description:"Concevoir et développer des interfaces web performantes, intuitives et responsives pour offrir une expérience utilisateur optimale.",
      image: "https://images.ctfassets.net/nla4ils4bv6t/2b5mIs7skdgmnBdv8u6D8l/a8e48df20eba2d193feb9c5f008de12b/dev-front.jpg"
    },
    {
      title: "Ingénieur réseaux",
      département: "Infrastructure Réseaux et Sécurité",
      dateSoumission: "05/18/2023",
      dateExpiration:"",
      description:"Garantir la qualité et la continuité des services réseau en assurant la mise en œuvre, le support et la documentation des projets selon les standards et SLA.",
      status:"Valable",
      image: "https://www.metier.org/wp-content/uploads/2022/09/ingenieur-reseaux-data-center-1280x720.jpg"
    },
    {
      title: "Architecte logiciel ",
      département: "Architecture des Systèmes d’Information ",
      dateSoumission: "",
      dateExpiration:"",
      description:"Concevoir et encadrer des solutions logicielles robustes et évolutives en garantissant performance, sécurité et alignement architectural dans un environnement Agile.",
      status:"Valable",
      image: "https://static.vitrine.ynov.com/cdn-cgi/image/width=650,height=363,fit=cover,format=auto/var/site/storage/images/6/6/5/3/53566-1-fre-FR/5e9d99c06461-architecte-logiciel-4.jpg"
    },
  ];

  return (
    <div className="job-container">
    {Jobs.map((job, index) => (
      <JobCard
        key={index}
        title={job.title}
        département={job.département}
        dateSoumission={job.dateSoumission}
        dateExpiration={job.dateExpiration}
        description={job.description}
        status={job.status}
        link={`/offre/${index}`}
        image={job.image}
        details={job.details}
        style={{ animationDelay: `${index * 0.3}s` }}  // délai progressif
      />
    ))}
  </div>
);
}


export default Offres;

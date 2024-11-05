import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";

export default function Home() {
  return (
    <section className="p-6 bg-background">
      <Header />

      <div className="max-w-4xl mx-auto text-center mt-12">
        <h1 className="text-4xl font-bold text-foreground mb-6">Bienvenue sur notre plateforme de gestion de budget</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Nous savons qu&apos;il n&apos;est pas toujours facile de suivre ses finances. C&apos;est pourquoi nous avons créé un outil simple, efficace et intuitif pour vous aider à garder un œil sur vos revenus, vos dépenses et votre solde restant, tout en vous assurant de rester organisé.
        </p>
        
        <div className="bg-card shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-primary mb-4">Comment ça marche ?</h2>
          <p className="text-muted-foreground text-lg mb-4">
            - **Planifiez vos revenus** : Ajoutez vos revenus mensuels et ajustez-les à tout moment.<br />
            - **Créez des catégories de dépenses** : Répartissez vos dépenses par catégories, pour mieux comprendre où va votre argent.<br />
            - **Suivez vos dépenses en temps réel** : Gardez un œil sur vos dépenses et ajustez-les si nécessaire pour ne jamais dépasser votre budget.<br />
            - **Téléchargez vos données** : Exportez vos informations au format XLSX (Excel,Numbers..) pour garder une trace de vos finances.
          </p>
        </div>

        <div className="bg-secondary p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-primary mb-4">Pourquoi choisir notre outil ?</h2>
          <p className="text-black text-lg mb-4">
            Ce site est conçu pour être utilisé aussi bien par des professionnels que des particuliers. Que vous soyez un responsable financier ou simplement une personne qui souhaite mieux gérer son budget, vous trouverez ici une solution adaptée à vos besoins.<br />
            **Simple** : Pas de courbe d&apos;apprentissage, l&apos;outil est intuitif et facile à utiliser.<br />
            **Efficace** : Gardez le contrôle de vos finances en temps réel et ajustez rapidement votre budget.<br />
            **Soutien continu** : Des ressources et une assistance pour vous accompagner à chaque étape.
          </p>
        </div>

        <p className="text-lg text-muted-foreground mt-6">
          Prêt à reprendre le contrôle de vos finances ? <strong>Commencez dès aujourd&apos;hui à planifier et à suivre votre budget !</strong>
        </p>
      </div>
      
      <Footer />
    </section>
  );
}

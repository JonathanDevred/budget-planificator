import React from 'react';
import { Header } from '../_components/Header';
import PlanningExpense from '../_components/PlanningExpense';
import { Footer } from '../_components/Footer';

const PlanningPage = () => {
  return (
    <section>
      <Header />

      <PlanningExpense />

      <Footer />
    </section>
  );
};

export default PlanningPage;

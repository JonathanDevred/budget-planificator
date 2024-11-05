import React from 'react';
import { Header } from '../_components/Header';
import { TrackingExpense } from '../_components/TrackingExpense';
import { Footer } from '../_components/Footer';

const PlanningPage = () => {
  return (
    <section>
      <Header />

      <TrackingExpense />

      <Footer />
    </section>
  );
};

export default PlanningPage;

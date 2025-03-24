"use client";
import Head from 'next/head';
import Header from '../components/Header';
import Banner from '../components/Banner';
import ServiceSection from '../components/ServiceSection';
import AppointmentContainer from '../components/AppointmentContainer';
import '../app/globals.css';
import CourseOffer from '@/components/CourseOffer';
import TeamMembers from '@/components/TeamMembers';
import { teamMembers } from '@/components/teamMembersData';
import TreatmentInfo from '@/components/TreatmentInfo';
import Footer from '@/components/Footer';

interface Service {
  id: string;
  name: string;
  image: string;
  description: string;
}

const services: Service[] = [
  { id: 'facials', name: 'Drenaje Linfático', image: '/img/drenaje.png', description: 'Drenaje linfático es una técnica que mediante suaves y repetidas maniobras con duración de 20 a 30min, siempre superficiales sobre la piel, logra acelerar e incluso redirigir la circulación linfática superficial. Su aplicación acelera la reabsorción del edema. Es un método que tiene como finalidad drenar líquidos subcutaneos hacia los ganglios, es excelente para personas muy sedentarias y también para pacientes con cirugías estéticas recientes.' },
  // ... otros servicios ...
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Beauty Spa Header</title>
      </Head>
      <Header />
      <Banner services={services} />
      <ServiceSection />
      <TeamMembers members={teamMembers} />
      <AppointmentContainer />
      <CourseOffer />
      <TreatmentInfo />
      <Footer />
    </>
  );
}
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

export default function Home() {
  return (
    <>
      <Head>
        <title>Beauty Spa Header</title>
      </Head>
      <Header />
      <Banner  />
      <ServiceSection />
      <TeamMembers members={teamMembers} />
      <AppointmentContainer />
      <CourseOffer />
      <TreatmentInfo />
      <Footer />
    </>
  );
}
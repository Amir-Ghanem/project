import { useState } from 'react';
import { HeroEditor } from '../../../components/admin/editors/HeroEditor';
import { MissionEditor } from '../../../components/admin/editors/MissionEditor';
import { StatisticsEditor } from '../../../components/admin/editors/StatisticsEditor';
import { FooterEditor } from '../../../components/admin/editors/FooterEditor';
import { AboutEditor } from '../../../components/admin/editors/AboutEditor';
import { CEOEditor } from '../../../components/admin/editors/CEOEditor';
import { TeamMemberEditor } from '../../../components/admin/editors/TeamMemberEditor';
import { TeamSectionEditor } from '../../../components/admin/editors/TeamSectionEditor';
import { ContactEditor } from '../../../components/admin/editors/ContactEditor';

const sections = [
  { id: 'hero', label: 'Hero Section' },
  { id: 'ceo', label: 'Ceo Section' },
  // { id: 'projects', label: 'Projects Section' },
  { id: 'aboutUs', label: 'AboutUs Section' },
  { id: 'team', label: 'Team Section' },
  { id: 'teamMember', label: 'Team Member' },
  // { id: 'trustedBy', label: 'TrustedBy / Partner' },
  
  // { id: 'blog', label: 'Blogs' },
  { id: 'mission', label: 'Mission Section' },
  { id: 'stats', label: 'Statistics Section' },
  { id: 'contact', label: 'Contact Section' },
  { id: 'footer', label: 'Footer Section' },
];

export default function AboutUsPageEditor() {
  const [activeSection, setActiveSection] = useState('hero');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Home Page</h1>
      
      <div className="flex gap-4 mb-8">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 rounded-lg ${
              activeSection === section.id
                ? 'bg-teal-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {activeSection === 'hero' && <HeroEditor />}
        {activeSection === 'ceo' && <CEOEditor />}
        {activeSection === 'aboutUs' && <AboutEditor />}

        {activeSection === 'mission' && <MissionEditor />}
        {activeSection === 'stats' && <StatisticsEditor />}
        {activeSection === 'team' && <TeamSectionEditor />}
        {activeSection === 'teamMember' && <TeamMemberEditor />}
        {activeSection === 'contact' && <ContactEditor />}

        {activeSection === 'footer' && <FooterEditor />}
        {/* Add other section editors */}
      </div>
    </div>
  );
}
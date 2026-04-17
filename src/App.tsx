/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Printer, 
  Trash2, 
  Calendar,
  Eye,
  History,
  FileEdit,
  ChevronDown,
  Search,
  X
} from 'lucide-react';

interface GuiaData {
  id: string;
  dataImpressao: string;
  origem: string;
  destino: string;
  setorDestino: string;
  cuidadosDe: string;
  itens: string;
  responsavel: string;
}

const LISTA_DESTINOS = [
  "CF ALICE DE JESUS REGO",
  "CF DEOLINDO COUTO",
  "CF EDSON ABDALLA SAAD",
  "CF ERNANI DE PAIVA FERREIRA BRAGA",
  "CF HELANDE DE MELLO GONÇALVES",
  "CF ILZO MOTTA DE MELLO",
  "CF JAMIL HADDAD",
  "CF JOÃO BATISTA CHAGAS",
  "CF JOSÉ ANTÔNIO CIRAUDO",
  "CF LENICE MARIA MONTEIRO COELHO",
  "CF LOURENÇO DE MELLO",
  "CF SAMUEL PENHA VALLE",
  "CF SÉRGIO AROUCA",
  "CF VALÉRIA GOMES ESTEVES",
  "CF WALDEMAR BERARDINELLI",
  "CMS ADELINO SIMÕES",
  "CMS ALOYSIO AMÂNCIO DA SILVA",
  "CMS CATTAPRETA",
  "CMS CESÁRIO DE MELO",
  "CMS CYRO DE MELLO",
  "CMS DÉCIO AMARAL FILHO",
  "CMS EMYDIO CABRAL",
  "CMS FLORIPES GALDINO PEREIRA",
  "CMS MARIA APARECIDA DE ALMEIDA",
  "CMS SÁVIO ANTUNES",
  "FORA DE ÁREA",
  "SMS POLICLÍNICA LINCOLN DE FREITAS FILHO",
  "CAPS SIMÃO BACAMARTE",
  "CAPSAD II JÚLIO CÉSAR DE CARVALHO",
  "CAPSI SANTA CRUZ",
  "CAPSI II MAFALDA",
  "HOSPITAL MUNICIPAL PEDRO SEGUNDO",
  "SMS UPA 24H JOÃO XXIII",
  "SMS UPA 24H PACIÊNCIA",
  "SMS UPA 24H SEPETIBA",
  "SES RJ UPA 24H SANTA CRUZ",
  "CONSELHO TUTELAR",
  "10ª CRE",
  "10ª CAS",
  "DEAMBULATÓRIO SEPETIVA"
];

const LISTA_ORIGENS = [
  "S/SUBPAV/CAP-5.3/DAPS"
];

const LISTA_SETORES = [
  "DIREÇÃO",
  "ADMINISTRAÇÃO"
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'nova' | 'historico'>('nova');
  const [historico, setHistorico] = useState<GuiaData[]>([]);
  const [isCustomDestino, setIsCustomDestino] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCustomOrigem, setIsCustomOrigem] = useState(false);
  const [isDropdownOrigemOpen, setIsDropdownOrigemOpen] = useState(false);
  const [isCustomSetor, setIsCustomSetor] = useState(false);
  const [isDropdownSetorOpen, setIsDropdownSetorOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermOrigem, setSearchTermOrigem] = useState('');
  const [searchTermSetor, setSearchTermSetor] = useState('');
  const [formData, setFormData] = useState({
    origem: '',
    destino: '',
    setorDestino: '',
    cuidadosDe: '',
    itens: '',
    responsavel: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setIsCustomDestino(false);
    setIsCustomOrigem(false);
    setIsCustomSetor(false);
    setFormData({
      origem: '',
      destino: '',
      setorDestino: '',
      cuidadosDe: '',
      itens: '',
      responsavel: ''
    });
  };

  const handlePrint = () => {
    const novaGuia: GuiaData = {
      id: Math.random().toString(36).substr(2, 9),
      dataImpressao: new Date().toISOString(),
      ...formData
    };
    setHistorico(prev => [novaGuia, ...prev]);
    window.print();
  };

  const handleDeleteHistorico = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este registro do histórico?')) {
      setHistorico(prev => prev.filter(guia => guia.id !== id));
    }
  };

  const filteredDestinos = LISTA_DESTINOS.filter(d => 
    d.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOrigens = LISTA_ORIGENS.filter(o => 
    o.toLowerCase().includes(searchTermOrigem.toLowerCase())
  );

  const filteredSetores = LISTA_SETORES.filter(s => 
    s.toLowerCase().includes(searchTermSetor.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f1f3f5] font-sans text-slate-900 flex flex-col print:bg-white">
      <style>
        {`
          @media print {
            @page {
              size: A4 landscape;
              margin: 5mm;
            }
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            #root {
              height: 100vh;
              overflow: hidden;
            }
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: #f1f5f9;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #94a3b8;
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #64748b;
            }
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f5f9;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #94a3b8;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #64748b;
          }
        `}
      </style>
      {/* TopAppBar */}
      <header className="bg-[#1c2e4a] flex flex-col sm:flex-row justify-between items-center w-full px-4 sm:px-6 py-4 border-b border-[#1c2e4a] sticky top-0 z-50 print:hidden gap-4 sm:gap-0">
        <div className="flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-start">
          <span className="text-lg sm:text-xl font-bold text-white text-center sm:text-left">GUIA DE REMESSA DAPS/CAP5.3</span>
        </div>
        <nav className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-center sm:justify-end overflow-x-auto">
          <button 
            onClick={() => setActiveTab('nova')}
            className={`flex items-center gap-2 text-base font-black transition-colors whitespace-nowrap ${activeTab === 'nova' ? 'text-white border-b-4 border-white pb-1' : 'text-blue-200 hover:text-white pb-1 border-b-4 border-transparent'}`}
          >
            <FileEdit className="w-5 h-5" />
            Nova Guia
          </button>
          <button 
            onClick={() => setActiveTab('historico')}
            className={`flex items-center gap-2 text-base font-black transition-colors whitespace-nowrap ${activeTab === 'historico' ? 'text-white border-b-4 border-white pb-1' : 'text-blue-200 hover:text-white pb-1 border-b-4 border-transparent'}`}
          >
            <History className="w-5 h-5" />
            Histórico
          </button>
        </nav>
      </header>

      <div className="flex flex-1 print:hidden">
        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-12 max-w-7xl mx-auto w-full">
          {activeTab === 'nova' ? (
            <>
              <div className="mb-6 sm:mb-10">
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tighter mb-2">Guia de Remessa</h1>
                <p className="text-slate-500 text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
                {/* Main Form Section */}
                <div className="lg:col-span-8 space-y-6 sm:space-y-8">
                  {/* Logística */}
                  <section className="bg-white p-5 sm:p-8 rounded-xl shadow-md border border-slate-200">
                    <h3 className="uppercase tracking-widest text-xs font-black text-slate-900 mb-6">Logística de Origem e Destino</h3>
                    <div className="grid grid-cols-1 gap-6">
                      <div className="relative">
                        <label className="block uppercase tracking-[0.05ch] text-xs font-black text-slate-800 mb-2">De (Origem)</label>
                        {!isCustomOrigem ? (
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setIsDropdownOrigemOpen(!isDropdownOrigemOpen)}
                              className="w-full bg-white border-2 border-slate-200 focus:border-[#00254b] text-lg font-bold text-slate-900 py-3 px-4 rounded-md transition-all outline-none flex items-center justify-between group hover:border-slate-400 shadow-sm"
                            >
                              <span className={formData.origem ? 'text-slate-900' : 'text-slate-400'}>
                                {formData.origem || "Selecione uma origem..."}
                              </span>
                              <ChevronDown className={`w-5 h-5 text-slate-600 transition-transform duration-300 ${isDropdownOrigemOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isDropdownOrigemOpen && (
                              <>
                                <div 
                                  className="fixed inset-0 z-50" 
                                  onClick={() => setIsDropdownOrigemOpen(false)}
                                />
                                <div className="absolute z-[60] left-0 right-0 mt-2 bg-white rounded-xl shadow-[0_25px_60px_rgba(0,0,0,0.2)] border-2 border-slate-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                  {/* Search Area */}
                                  <div className="p-4 border-b-2 border-slate-100 flex items-center gap-3 bg-slate-50">
                                    <Search className="w-5 h-5 text-slate-700" />
                                    <input
                                      type="text"
                                      autoFocus
                                      placeholder="Buscar origem..."
                                      value={searchTermOrigem}
                                      onChange={(e) => setSearchTermOrigem(e.target.value)}
                                      className="w-full bg-transparent border-none focus:ring-0 text-base font-bold text-slate-900 outline-none"
                                    />
                                    {searchTermOrigem && (
                                      <button onClick={() => setSearchTermOrigem('')} className="p-1 hover:bg-slate-200 rounded-full transition-colors">
                                        <X className="w-4 h-4 text-slate-600" />
                                      </button>
                                    )}
                                  </div>

                                  {/* Options List */}
                                  <div className="max-h-72 overflow-y-auto custom-scrollbar">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setIsCustomOrigem(true);
                                        setIsDropdownOrigemOpen(false);
                                        setFormData(prev => ({ ...prev, origem: '' }));
                                      }}
                                      className="w-full text-left px-5 py-4 text-base font-black text-[#1c2e4a] hover:bg-blue-50 transition-colors flex items-center gap-2 border-b-2 border-slate-100"
                                    >
                                      <span className="text-xl">✎</span> Digitar origem personalizada...
                                    </button>
                                    
                                    {filteredOrigens.length > 0 ? (
                                      filteredOrigens.map((origem) => (
                                        <button
                                          key={origem}
                                          type="button"
                                          onClick={() => {
                                            setFormData(prev => ({ ...prev, origem }));
                                            setIsDropdownOrigemOpen(false);
                                            setSearchTermOrigem('');
                                          }}
                                          className={`w-full text-left px-5 py-4 text-base font-bold transition-colors flex items-center gap-2 border-b border-slate-50 last:border-0 ${
                                            formData.origem === origem 
                                              ? 'bg-blue-100 text-[#00254b] font-black' 
                                              : 'text-slate-800 hover:bg-slate-50'
                                          }`}
                                        >
                                          {origem}
                                        </button>
                                      ))
                                    ) : (
                                      <div className="px-4 py-10 text-center text-slate-600 font-bold text-sm">
                                        Nenhuma origem encontrada para "{searchTermOrigem}"
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        ) : (
                          <div className="relative">
                            <input 
                              name="origem"
                              value={formData.origem}
                              onChange={handleChange}
                              placeholder="Digite a origem livremente..."
                              className="w-full bg-white border-2 border-slate-200 focus:border-[#00254b] text-lg font-bold text-slate-900 py-3 px-4 rounded-md transition-all outline-none shadow-sm" 
                              type="text" 
                              autoFocus
                            />
                            <button 
                              onClick={() => {
                                setIsCustomOrigem(false);
                                setFormData(prev => ({ ...prev, origem: '' }));
                              }}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-black text-slate-700 hover:text-[#00254b] transition-colors p-2 bg-slate-100 rounded-md shadow-sm border border-slate-200"
                              title="Voltar para lista"
                            >
                              Voltar
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative">
                        <label className="block uppercase tracking-[0.05ch] text-xs font-black text-slate-800 mb-2">Para (Destino)</label>
                        {!isCustomDestino ? (
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                              className="w-full bg-white border-2 border-slate-200 focus:border-[#00254b] text-lg font-bold text-slate-900 py-3 px-4 rounded-md transition-all outline-none flex items-center justify-between group hover:border-slate-400 shadow-sm"
                            >
                              <span className={formData.destino ? 'text-slate-900' : 'text-slate-400'}>
                                {formData.destino || "Selecione um destino..."}
                              </span>
                              <ChevronDown className={`w-5 h-5 text-slate-600 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isDropdownOpen && (
                              <>
                                <div 
                                  className="fixed inset-0 z-50" 
                                  onClick={() => setIsDropdownOpen(false)}
                                />
                                <div className="absolute z-[60] left-0 right-0 mt-2 bg-white rounded-xl shadow-[0_25px_60px_rgba(0,0,0,0.2)] border-2 border-slate-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                  {/* Search Area */}
                                  <div className="p-4 border-b-2 border-slate-100 flex items-center gap-3 bg-slate-50">
                                    <Search className="w-5 h-5 text-slate-700" />
                                    <input
                                      type="text"
                                      autoFocus
                                      placeholder="Buscar destino..."
                                      value={searchTerm}
                                      onChange={(e) => setSearchTerm(e.target.value)}
                                      className="w-full bg-transparent border-none focus:ring-0 text-base font-bold text-slate-900 outline-none"
                                    />
                                    {searchTerm && (
                                      <button onClick={() => setSearchTerm('')} className="p-1 hover:bg-slate-200 rounded-full transition-colors">
                                        <X className="w-4 h-4 text-slate-600" />
                                      </button>
                                    )}
                                  </div>

                                  {/* Options List */}
                                  <div className="max-h-72 overflow-y-auto custom-scrollbar">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setIsCustomDestino(true);
                                        setIsDropdownOpen(false);
                                        setFormData(prev => ({ ...prev, destino: '' }));
                                      }}
                                      className="w-full text-left px-5 py-4 text-base font-black text-[#1c2e4a] hover:bg-blue-50 transition-colors flex items-center gap-2 border-b-2 border-slate-100"
                                    >
                                      <span className="text-xl">✎</span> Digitar destino personalizado...
                                    </button>
                                    
                                    {filteredDestinos.length > 0 ? (
                                      filteredDestinos.map((destino) => (
                                        <button
                                          key={destino}
                                          type="button"
                                          onClick={() => {
                                            setFormData(prev => ({ ...prev, destino }));
                                            setIsDropdownOpen(false);
                                            setSearchTerm('');
                                          }}
                                          className={`w-full text-left px-5 py-4 text-base font-bold transition-colors flex items-center gap-2 border-b border-slate-50 last:border-0 ${
                                            formData.destino === destino 
                                              ? 'bg-blue-100 text-[#00254b] font-black' 
                                              : 'text-slate-800 hover:bg-slate-50'
                                          }`}
                                        >
                                          {destino}
                                        </button>
                                      ))
                                    ) : (
                                      <div className="px-4 py-10 text-center text-slate-600 font-bold text-sm">
                                        Nenhum destino encontrado para "{searchTerm}"
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        ) : (
                          <div className="relative">
                            <input 
                              name="destino"
                              value={formData.destino}
                              onChange={handleChange}
                              placeholder="Digite o destino livremente..."
                              className="w-full bg-white border-2 border-slate-200 focus:border-[#00254b] text-lg font-bold text-slate-900 py-3 px-4 rounded-md transition-all outline-none shadow-sm" 
                              type="text" 
                              autoFocus
                            />
                            <button 
                              onClick={() => {
                                setIsCustomDestino(false);
                                setFormData(prev => ({ ...prev, destino: '' }));
                              }}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-black text-slate-700 hover:text-[#00254b] transition-colors p-2 bg-slate-100 rounded-md shadow-sm border border-slate-200"
                              title="Voltar para lista"
                            >
                              Voltar
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="relative">
                        <label className="block uppercase tracking-[0.05ch] text-xs font-black text-slate-800 mb-2">Setor do Destino</label>
                        {!isCustomSetor ? (
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setIsDropdownSetorOpen(!isDropdownSetorOpen)}
                              className="w-full bg-white border-2 border-slate-200 focus:border-[#00254b] text-lg font-bold text-slate-900 py-3 px-4 rounded-md transition-all outline-none flex items-center justify-between group hover:border-slate-400 shadow-sm"
                            >
                              <span className={formData.setorDestino ? 'text-slate-900' : 'text-slate-400'}>
                                {formData.setorDestino || "Selecione um setor..."}
                              </span>
                              <ChevronDown className="w-5 h-5 text-slate-600 transition-transform duration-300" />
                            </button>

                            {isDropdownSetorOpen && (
                              <>
                                <div 
                                  className="fixed inset-0 z-50" 
                                  onClick={() => setIsDropdownSetorOpen(false)}
                                />
                                <div className="absolute z-[60] left-0 right-0 mt-2 bg-white rounded-xl shadow-[0_25px_60px_rgba(0,0,0,0.2)] border-2 border-slate-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                  {/* Search Area */}
                                  <div className="p-4 border-b-2 border-slate-100 flex items-center gap-3 bg-slate-50">
                                    <Search className="w-5 h-5 text-slate-700" />
                                    <input
                                      type="text"
                                      autoFocus
                                      placeholder="Buscar setor..."
                                      value={searchTermSetor}
                                      onChange={(e) => setSearchTermSetor(e.target.value)}
                                      className="w-full bg-transparent border-none focus:ring-0 text-base font-bold text-slate-900 outline-none"
                                    />
                                    {searchTermSetor && (
                                      <button onClick={() => setSearchTermSetor('')} className="p-1 hover:bg-slate-200 rounded-full transition-colors">
                                        <X className="w-4 h-4 text-slate-600" />
                                      </button>
                                    )}
                                  </div>

                                  {/* Options List */}
                                  <div className="max-h-72 overflow-y-auto custom-scrollbar">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setIsCustomSetor(true);
                                        setIsDropdownSetorOpen(false);
                                        setFormData(prev => ({ ...prev, setorDestino: '' }));
                                      }}
                                      className="w-full text-left px-5 py-4 text-base font-black text-[#1c2e4a] hover:bg-blue-50 transition-colors flex items-center gap-2 border-b-2 border-slate-100"
                                    >
                                      <span className="text-xl">✎</span> Digitar setor personalizado...
                                    </button>
                                    
                                    {filteredSetores.length > 0 ? (
                                      filteredSetores.map((setor) => (
                                        <button
                                          key={setor}
                                          type="button"
                                          onClick={() => {
                                            setFormData(prev => ({ ...prev, setorDestino: setor }));
                                            setIsDropdownSetorOpen(false);
                                            setSearchTermSetor('');
                                          }}
                                          className={`w-full text-left px-5 py-4 text-base font-bold transition-colors flex items-center gap-2 border-b border-slate-50 last:border-0 ${
                                            formData.setorDestino === setor 
                                              ? 'bg-blue-100 text-[#00254b] font-black' 
                                              : 'text-slate-800 hover:bg-slate-50'
                                          }`}
                                        >
                                          {setor}
                                        </button>
                                      ))
                                    ) : (
                                      <div className="px-4 py-10 text-center text-slate-600 font-bold text-sm">
                                        Nenhum setor encontrado para "{searchTermSetor}"
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        ) : (
                          <div className="relative">
                            <input 
                              name="setorDestino"
                              value={formData.setorDestino}
                              onChange={handleChange}
                              placeholder="Digite o setor livremente..."
                              className="w-full bg-white border-2 border-slate-200 focus:border-[#00254b] text-lg font-bold text-slate-900 py-3 px-4 rounded-md transition-all outline-none shadow-sm" 
                              type="text" 
                              autoFocus
                            />
                            <button 
                              onClick={() => {
                                setIsCustomSetor(false);
                                setFormData(prev => ({ ...prev, setorDestino: '' }));
                              }}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-black text-slate-700 hover:text-[#00254b] transition-colors p-2 bg-slate-100 rounded-md shadow-sm border border-slate-200"
                              title="Voltar para lista"
                            >
                              Voltar
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </section>

                  {/* Conteúdo */}
                  <section className="bg-white p-5 sm:p-8 rounded-xl shadow-md border border-slate-200">
                    <h3 className="uppercase tracking-widest text-xs font-black text-slate-900 mb-6">Conteúdo da Remessa</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block uppercase tracking-[0.05ch] text-xs font-black text-slate-800 mb-2">Aos Cuidados de</label>
                        <input 
                          name="cuidadosDe"
                          value={formData.cuidadosDe}
                          onChange={handleChange}
                          className="w-full bg-white border-2 border-slate-200 focus:border-[#00254b] text-lg font-bold text-slate-900 py-3 px-4 rounded-md transition-all outline-none shadow-sm" 
                          type="text" 
                        />
                      </div>
                      <div>
                        <label className="block uppercase tracking-[0.05ch] text-xs font-black text-slate-800 mb-2">Item(ns) Remetido(s)</label>
                        <textarea 
                          name="itens"
                          value={formData.itens}
                          onChange={handleChange}
                          className="w-full bg-white border-2 border-slate-200 focus:border-[#00254b] text-lg font-bold text-slate-900 py-3 px-4 rounded-md transition-all resize-none outline-none shadow-sm" 
                          rows={3}
                        />
                      </div>
                    </div>
                  </section>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-4 space-y-6 sm:space-y-8 lg:sticky lg:top-24 print:hidden">
                  {/* Responsabilidade */}
                  <section className="bg-white p-5 sm:p-8 rounded-xl shadow-md border border-slate-200 text-center">
                    <h3 className="uppercase tracking-widest text-xs font-black text-slate-900 mb-6">RESPONSABILIDADE PELO ENVIO</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block uppercase tracking-[0.05ch] text-xs font-black text-slate-800 mb-2">Nome do Responsável</label>
                        <input 
                          name="responsavel"
                          value={formData.responsavel}
                          onChange={handleChange}
                          className="w-full bg-white border-2 border-slate-200 focus:border-[#00254b] text-lg font-bold text-slate-900 py-3 px-4 rounded-md transition-all outline-none shadow-sm text-center" 
                          type="text" 
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <label className="block uppercase tracking-[0.05ch] text-xs font-black text-slate-800 mb-2">Status da Guia</label>
                        <div className="inline-flex items-center px-4 py-2 bg-[#00433b] text-white rounded-full text-sm font-black shadow-md">
                          <span className="w-3 h-3 bg-[#57b4a4] rounded-full mr-3 animate-pulse"></span>
                          Pronta para Impressão
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Actions */}
                  <div className="bg-white p-5 sm:p-8 rounded-xl shadow-md border border-slate-200 print:hidden">
                    <div className="flex flex-col gap-4">
                      <button 
                        onClick={handlePrint}
                        className="w-full py-4 bg-[#1c2e4a] text-white font-black text-lg rounded-md hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-lg"
                      >
                        <Printer className="w-6 h-6" />
                        Visualizar para Imprimir
                      </button>
                      <button 
                        onClick={handleClear}
                        className="w-full py-4 bg-white text-slate-900 font-black text-lg rounded-md border-2 border-slate-300 hover:bg-slate-50 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-sm"
                      >
                        <Trash2 className="w-6 h-6" />
                        Limpar
                      </button>
                    </div>
                    <p className="text-xs text-center mt-6 text-slate-500 font-black uppercase tracking-wider">Última edição há 2 minutos</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tighter mb-2">Histórico de Impressões</h1>
                  <p className="text-slate-500 text-sm">
                    Visualize as guias que já foram impressas nesta sessão.
                  </p>
                </div>
                {historico.length > 0 && (
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full">
                    Exibindo os últimos 20 registros
                  </span>
                )}
              </div>

              {historico.length === 0 ? (
                <div className="bg-white p-8 sm:p-12 rounded-xl shadow-sm border border-slate-100 text-center flex flex-col items-center justify-center">
                  <History className="w-12 h-12 sm:w-16 sm:h-16 text-slate-200 mb-4" />
                  <h3 className="text-base sm:text-lg font-bold text-slate-700 mb-2">Nenhum histórico encontrado</h3>
                  <p className="text-slate-500 text-sm">As guias que você imprimir aparecerão aqui.</p>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead>
                        <tr className="bg-slate-100 border-b-2 border-slate-200">
                          <th className="py-4 px-6 uppercase tracking-widest text-xs font-black text-slate-900">Data/Hora</th>
                          <th className="py-4 px-6 uppercase tracking-widest text-xs font-black text-slate-900">Destino</th>
                          <th className="py-4 px-6 uppercase tracking-widest text-xs font-black text-slate-900">Setor</th>
                          <th className="py-4 px-6 uppercase tracking-widest text-xs font-black text-slate-900">Responsável</th>
                          <th className="py-4 px-6 uppercase tracking-widest text-xs font-black text-slate-900 text-center">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {historico.slice(0, 20).map((guia) => (
                          <tr key={guia.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                            <td className="py-4 px-6 text-sm text-slate-900 font-bold whitespace-nowrap">
                              {new Date(guia.dataImpressao).toLocaleString('pt-BR')}
                            </td>
                            <td className="py-4 px-6 text-sm text-slate-900 font-black">{guia.destino}</td>
                            <td className="py-4 px-6 text-sm text-slate-800 font-bold">{guia.setorDestino}</td>
                            <td className="py-4 px-6 text-sm text-slate-800 font-bold">{guia.responsavel}</td>
                            <td className="py-4 px-6 flex justify-center gap-3">
                              <button 
                                onClick={() => {
                                  setFormData({
                                    origem: guia.origem,
                                    destino: guia.destino,
                                    setorDestino: guia.setorDestino,
                                    cuidadosDe: guia.cuidadosDe,
                                    itens: guia.itens,
                                    responsavel: guia.responsavel
                                  });
                                  setActiveTab('nova');
                                }}
                                className="p-2.5 text-blue-700 hover:bg-blue-100 rounded-md transition-colors border border-blue-200"
                                title="Preencher formulário com estes dados"
                              >
                                <FileEdit className="w-5 h-5" />
                              </button>
                              <button 
                                onClick={() => handleDeleteHistorico(guia.id)}
                                className="p-2.5 text-red-600 hover:bg-red-100 rounded-md transition-colors border border-red-200"
                                title="Excluir este registro"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Bottom Nav Mobile */}
      {activeTab === 'nova' && (
        <>
          <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-center gap-4 sm:gap-8 px-4 py-3 sm:py-4 lg:hidden bg-white/90 backdrop-blur-md shadow-[0_-8px_24px_rgba(0,37,75,0.08)] rounded-t-2xl border-t border-slate-200 print:hidden">
            <button 
              onClick={handlePrint}
              className="flex flex-1 sm:flex-none flex-col items-center justify-center bg-[#1c2e4a] text-white rounded-xl px-4 sm:px-6 py-2 transition-transform active:scale-95"
            >
              <Eye className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Visualizar</span>
            </button>
            <button 
              onClick={handleClear}
              className="flex flex-1 sm:flex-none flex-col items-center justify-center text-slate-500 bg-slate-50 px-4 sm:px-6 py-2 hover:bg-slate-100 rounded-xl transition-transform active:scale-95 border border-slate-200"
            >
              <Trash2 className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Limpar</span>
            </button>
          </nav>
          {/* Spacer for mobile nav */}
          <div className="h-24 lg:hidden print:hidden"></div>
        </>
      )}

      {/* Developer Credit Footer */}
      <footer className="w-full py-4 text-center border-t border-slate-100 bg-white/50 print:hidden">
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-[0.1em]">
          Desenvolvido por Fabio Ferreira de Oliveira &nbsp;•&nbsp; DAPS/CAP5.3
        </p>
      </footer>

      {/* Print Layout */}
      <div className="hidden print:flex w-full bg-white text-black h-[100vh] pt-4 pb-2 gap-4 font-sans overflow-hidden" style={{ boxSizing: 'border-box' }}>
        {[1, 2].map((i) => (
          <div key={i} className="flex-1 border-r border-black last:border-r-0 pr-4 last:pr-0 pl-4 first:pl-0 flex flex-col relative h-full">
            {/* Header */}
            <div className="flex items-center mb-10 shrink-0">
              <div className="flex flex-col items-center justify-center text-[#1c4587] mr-4">
                <span className="text-5xl font-black tracking-tighter leading-none">Rio</span>
                <span className="text-[10px] font-bold tracking-[0.2em] mt-1">PREFEITURA</span>
              </div>
              
              <div className="h-12 w-[2.5px] bg-[#1c4587] mx-3 shrink-0"></div>
              
              <div className="text-[#1c4587] font-bold flex items-center ml-2">
                <span className="text-2xl mr-4 shrink-0 tracking-tight">SAÚDE</span>
                <div className="flex flex-col text-[11px] leading-tight">
                  <span className="font-extrabold">PREFEITURA DA CIDADE DO RIO DE JANEIRO</span>
                  <span className="font-bold">Secretaria Municipal de Saúde - SMS</span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-center font-bold text-lg mb-6 shrink-0">GUIA DE REMESSA</h1>

            {/* Form Fields */}
            <div className="space-y-4 text-xs font-bold flex-1 ml-2 overflow-hidden">
              <div className="flex gap-3">
                <span className="w-20 text-right shrink-0">DE</span>
                <span className="font-normal uppercase flex-1 truncate">{formData.origem}</span>
              </div>
              <div className="flex gap-3">
                <span className="w-20 text-right shrink-0">PARA:</span>
                <span className="font-normal uppercase flex-1 truncate">{formData.destino}</span>
              </div>
              <div className="flex gap-3">
                <span className="w-20 text-right shrink-0">SETOR</span>
                <span className="font-normal uppercase flex-1 truncate">{formData.setorDestino}</span>
              </div>
              <div className="flex gap-3">
                <span className="w-20 text-right shrink-0">A/C</span>
                <span className="font-normal uppercase flex-1 truncate">{formData.cuidadosDe}</span>
              </div>
              <div className="flex gap-3 mt-4 h-full min-h-[4rem]">
                <span className="w-20 text-right leading-tight mt-1 shrink-0">ITEM(NS)<br/>REMETIDO(S):</span>
                <span className="font-normal uppercase flex-1 overflow-hidden break-words line-clamp-4">{formData.itens}</span>
              </div>
            </div>

            {/* Footer Area */}
            <div className="mt-auto flex flex-col w-full shrink-0">
              <div className="text-center mb-4">
                <div className="text-xs font-bold uppercase mb-1">NOME DO RESPONSÁVEL PELA REMESSA</div>
                <div className="text-xs font-bold uppercase">{formData.responsavel}</div>
              </div>
              
              <div className="text-center text-[10px] font-bold mb-2 uppercase">
                {new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())}
              </div>
              
              <div className="w-full bg-[#1c4587] text-white text-center font-bold py-1 text-xs mb-3">
                REGISTRO DE RECEBIMENTO
              </div>
              
              <div className="text-left text-xs font-bold mb-8 ml-2">
                DATA DE RECEBIMENTO _____/_____/_______
              </div>

              <div className="flex flex-col items-center gap-8 mb-2">
                <div className="w-3/4 border-t border-black text-center pt-1 text-[10px] font-bold">
                  NOME LEGÍVEL DO RESPONSÁVEL PELO RECEBIMENTO
                </div>
                <div className="w-3/4 border-t border-black text-center pt-1 text-[10px] font-bold">
                  ASSINATURA E/OU CARIMBO DO RECEBEDOR
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

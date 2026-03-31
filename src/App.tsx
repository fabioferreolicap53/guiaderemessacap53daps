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
  FileEdit
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

export default function App() {
  const [activeTab, setActiveTab] = useState<'nova' | 'historico'>('nova');
  const [historico, setHistorico] = useState<GuiaData[]>([]);
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

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-slate-900 flex flex-col print:bg-white">
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
            className={`flex items-center gap-2 text-sm font-bold transition-colors ${activeTab === 'nova' ? 'text-white border-b-2 border-white pb-1' : 'text-blue-200 hover:text-white pb-1 border-b-2 border-transparent'}`}
          >
            <FileEdit className="w-4 h-4" />
            Nova Guia
          </button>
          <button 
            onClick={() => setActiveTab('historico')}
            className={`flex items-center gap-2 text-sm font-bold transition-colors ${activeTab === 'historico' ? 'text-white border-b-2 border-white pb-1' : 'text-blue-200 hover:text-white pb-1 border-b-2 border-transparent'}`}
          >
            <History className="w-4 h-4" />
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
                  <section className="bg-white p-5 sm:p-8 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="uppercase tracking-widest text-[10px] font-bold text-slate-500 mb-6">Logística de Origem e Destino</h3>
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label className="block uppercase tracking-[0.05ch] text-[10px] font-semibold text-slate-500 mb-2">De (Origem)</label>
                        <input 
                          name="origem"
                          value={formData.origem}
                          onChange={handleChange}
                          className="w-full bg-slate-100 border-none focus:bg-slate-50 focus:ring-0 focus:border-b-2 focus:border-[#00254b] text-base text-[#00254b] py-3 px-4 rounded-md transition-all outline-none" 
                          type="text" 
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block uppercase tracking-[0.05ch] text-[10px] font-semibold text-slate-500 mb-2">Para (Destino)</label>
                          <input 
                            name="destino"
                            value={formData.destino}
                            onChange={handleChange}
                            className="w-full bg-slate-100 border-none focus:bg-slate-50 focus:ring-0 focus:border-b-2 focus:border-[#00254b] text-base text-[#00254b] py-3 px-4 rounded-md transition-all outline-none" 
                            type="text" 
                          />
                        </div>
                        <div>
                          <label className="block uppercase tracking-[0.05ch] text-[10px] font-semibold text-slate-500 mb-2">Setor do Destino</label>
                          <input 
                            name="setorDestino"
                            value={formData.setorDestino}
                            onChange={handleChange}
                            className="w-full bg-slate-100 border-none focus:bg-slate-50 focus:ring-0 focus:border-b-2 focus:border-[#00254b] text-base text-[#00254b] py-3 px-4 rounded-md transition-all outline-none" 
                            type="text" 
                          />
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Conteúdo */}
                  <section className="bg-white p-5 sm:p-8 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="uppercase tracking-widest text-[10px] font-bold text-slate-500 mb-6">Conteúdo da Remessa</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block uppercase tracking-[0.05ch] text-[10px] font-semibold text-slate-500 mb-2">Aos Cuidados de</label>
                        <input 
                          name="cuidadosDe"
                          value={formData.cuidadosDe}
                          onChange={handleChange}
                          className="w-full bg-slate-100 border-none focus:bg-slate-50 focus:ring-0 focus:border-b-2 focus:border-[#00254b] text-base text-[#00254b] py-3 px-4 rounded-md transition-all outline-none" 
                          type="text" 
                        />
                      </div>
                      <div>
                        <label className="block uppercase tracking-[0.05ch] text-[10px] font-semibold text-slate-500 mb-2">Item(ns) Remetido(s)</label>
                        <textarea 
                          name="itens"
                          value={formData.itens}
                          onChange={handleChange}
                          className="w-full bg-slate-100 border-none focus:bg-slate-50 focus:ring-0 focus:border-b-2 focus:border-[#00254b] text-base text-[#00254b] py-3 px-4 rounded-md transition-all resize-none outline-none" 
                          rows={3}
                        />
                      </div>
                    </div>
                  </section>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-4 space-y-6 sm:space-y-8 lg:sticky lg:top-24 print:hidden">
                  {/* Responsabilidade */}
                  <section className="bg-white p-5 sm:p-8 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="uppercase tracking-widest text-[10px] font-bold text-slate-500 mb-6 text-center">RESPONSABILIDADE PELO ENVIO</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block uppercase tracking-[0.05ch] text-[10px] font-semibold text-slate-500 mb-2">Nome do Responsável</label>
                        <input 
                          name="responsavel"
                          value={formData.responsavel}
                          onChange={handleChange}
                          className="w-full bg-slate-100 border-none focus:bg-slate-50 focus:ring-0 focus:border-b-2 focus:border-[#00254b] text-base text-[#00254b] py-3 px-4 rounded-md transition-all outline-none" 
                          type="text" 
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <label className="block uppercase tracking-[0.05ch] text-[10px] font-semibold text-slate-500 mb-2">Status da Guia</label>
                        <div className="inline-flex items-center px-3 py-1 bg-[#00433b] text-white rounded-full text-xs font-bold">
                          <span className="w-2 h-2 bg-[#57b4a4] rounded-full mr-2"></span>
                          Pronta para Impressão
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Actions */}
                  <div className="bg-white p-5 sm:p-8 rounded-xl shadow-sm border border-slate-100 print:hidden">
                    <div className="flex flex-col gap-4">
                      <button 
                        onClick={handlePrint}
                        className="w-full py-4 bg-[#1c2e4a] text-white font-bold text-base rounded-md hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                      >
                        <Printer className="w-5 h-5" />
                        Visualizar para Imprimir
                      </button>
                      <button 
                        onClick={handleClear}
                        className="w-full py-4 bg-transparent text-slate-700 font-semibold text-base rounded-md border border-slate-300 hover:bg-slate-50 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                      >
                        <Trash2 className="w-5 h-5" />
                        Limpar
                      </button>
                    </div>
                    <p className="text-[10px] text-center mt-6 text-slate-400 font-medium uppercase tracking-wider">Última edição há 2 minutos</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <div className="mb-6 sm:mb-10">
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tighter mb-2">Histórico de Impressões</h1>
                <p className="text-slate-500 text-sm">
                  Visualize as guias que já foram impressas nesta sessão.
                </p>
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
                        <tr className="bg-slate-50 border-b border-slate-100">
                          <th className="py-3 px-4 sm:py-4 sm:px-6 uppercase tracking-widest text-[10px] font-bold text-slate-500">Data/Hora</th>
                          <th className="py-3 px-4 sm:py-4 sm:px-6 uppercase tracking-widest text-[10px] font-bold text-slate-500">Destino</th>
                          <th className="py-3 px-4 sm:py-4 sm:px-6 uppercase tracking-widest text-[10px] font-bold text-slate-500">Setor</th>
                          <th className="py-3 px-4 sm:py-4 sm:px-6 uppercase tracking-widest text-[10px] font-bold text-slate-500">Responsável</th>
                          <th className="py-3 px-4 sm:py-4 sm:px-6 uppercase tracking-widest text-[10px] font-bold text-slate-500 text-center">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {historico.map((guia) => (
                          <tr key={guia.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-4 sm:py-4 sm:px-6 text-xs sm:text-sm text-slate-700 font-medium whitespace-nowrap">
                              {new Date(guia.dataImpressao).toLocaleString('pt-BR')}
                            </td>
                            <td className="py-3 px-4 sm:py-4 sm:px-6 text-xs sm:text-sm text-slate-900 font-bold">{guia.destino}</td>
                            <td className="py-3 px-4 sm:py-4 sm:px-6 text-xs sm:text-sm text-slate-600">{guia.setorDestino}</td>
                            <td className="py-3 px-4 sm:py-4 sm:px-6 text-xs sm:text-sm text-slate-600">{guia.responsavel}</td>
                            <td className="py-3 px-4 sm:py-4 sm:px-6 flex justify-center gap-2">
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
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                title="Preencher formulário com estes dados"
                              >
                                <FileEdit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteHistorico(guia.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                                title="Excluir este registro"
                              >
                                <Trash2 className="w-4 h-4" />
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

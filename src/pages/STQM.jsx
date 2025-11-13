import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Code, CheckCircle, ArrowRight, FileText, Globe, Zap, Shield,
    Moon, Sun, Download, ExternalLink, Lock
} from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

const lightTheme = {
    primary: '#7B9ACC',
    light: '#A7C7E7',
    bg: '#F8FBFF',
    surface: '#FFFFFF',
    text: '#1A365D',
    success: '#10B981',
    danger: '#EF4444',
    warning: '#F59E0B',
};

const darkTheme = {
    primary: '#60A5FA',
    light: '#1E40AF',
    bg: '#0F172A',
    surface: '#1E293B',
    text: '#F1F5F9',
    success: '#34D399',
    danger: '#F87171',
    warning: '#FBBF24',
};

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function STQMFullShowcase() {
    const [activeTab, setActiveTab] = useState('overview');
    const [isDark, setIsDark] = useState(false);
    const componentRef = useRef();
    const theme = isDark ? darkTheme : lightTheme;

    // SCROLL TO TOP ON PAGE LOAD
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'STQM_Project1_Static_Testing_FMEA',
    });

    return (
        <div ref={componentRef} style={{
            minHeight: '100vh',
            background: theme.bg,
            fontFamily: "'Inter', sans-serif",
            color: theme.text,
            transition: 'all 0.3s ease',
        }}>
            {/* Header */}
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: theme.surface, padding: '12px 20px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Lock size={18} color={theme.primary} />
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Confidential UTS Assignment</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => setIsDark(!isDark)} style={iconBtn}>
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button onClick={handlePrint} style={iconBtn}>
                        <Download size={20} />
                    </button>
                </div>
            </div>

            {/* Hero */}
            <section style={{ padding: '100px 20px 80px', textAlign: 'center', background: `linear-gradient(135deg, ${theme.light} 0%, ${theme.primary} 100%)`, color: 'white' }}>
                <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: '3rem', fontWeight: 800, margin: 0 }}>
                    Systems Testing & Quality Management
                </motion.h1>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ fontSize: '1.3rem', margin: '16px 0 32px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
                    3 Projects: Static Review (40 issues), Black/White-Box (37 cases), E2E Automation (88% pass)
                </motion.p>
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
                    <ImpactCard icon={<Shield />} value="40" label="Issues Found" />
                    <ImpactCard icon={<Zap />} value="85%" label="Coverage" />
                    <ImpactCard icon={<CheckCircle />} value="88%" label="Pass Rate" />
                </motion.div>
            </section>

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', padding: '30px 20px', flexWrap: 'wrap' }}>
                {['overview', 'project1', 'project2', 'project3', 'impact'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '12px 28px',
                            border: 'none',
                            borderRadius: '50px',
                            background: activeTab === tab ? theme.primary : theme.surface,
                            color: activeTab === tab ? 'white' : theme.text,
                            fontWeight: 600,
                            cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                            transition: '0.3s',
                        }}
                    >
                        {tab === 'project1' ? 'Project 1: Static + FMEA' : tab === 'project2' ? 'Project 2: B/W-Box' : tab === 'project3' ? 'Project 3: System Test' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div style={{ maxWidth: '1100px', margin: '0 auto 80px', padding: '0 20px' }}>
                {activeTab === 'overview' && <Overview theme={theme} />}
                {activeTab === 'project1' && <Project1 theme={theme} />}
                {activeTab === 'project2' && <Project2 theme={theme} />}
                {activeTab === 'project3' && <Project3 theme={theme} />}
                {activeTab === 'impact' && <Impact theme={theme} />}
            </div>

            {/* Footer */}
            <motion.footer initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: theme.primary, color: 'white', textAlign: 'center', padding: '40px 20px' }}>
                <h3 style={{ margin: '0 0 16px', fontSize: '1.5rem' }}>Quality is Non-Negotiable</h3>
                <p style={{ margin: '0 0 24px', opacity: 0.9 }}>From requirements to production — I prevent bugs.</p>
            </motion.footer>
        </div>
    );
}

// === PROJECT 1: FULL 20 DEFECTS + 20 FMEA ===
function Project1({ theme }) {
    const defects = [
        { id: 'ST001', domain: 'Security', issue: 'Password complexity rules undefined', source: '15a', tags: ['Incomplete', 'Ambiguous'] },
        { id: 'ST002', domain: 'Functionality', issue: 'Prerequisite override process unclear', source: 'Req #12F, p.14', tags: ['Incomplete'] },
        { id: 'ST003', domain: 'Performance', issue: 'No overload prevention criteria', source: 'Req #7F, p.14', tags: ['Incomplete', 'Ambiguous'] },
        { id: 'ST004', domain: 'Performance', issue: 'Speed/latency not quantified', source: '12a', tags: ['Ambiguous'] },
        { id: 'ST005', domain: 'Operations', issue: '24/7 DB vs office-hours registration', source: '12b vs 10F', tags: ['Inconsistent'] },
        { id: 'ST006', domain: 'UI', issue: 'Color blindness accommodations vague', source: '11e', tags: ['Incomplete', 'Ambiguous', 'Untestable'] },
        { id: 'ST007', domain: 'Functionality', issue: 'Waitlist enrollment untestable without rules', source: '8B', tags: ['Untestable'] },
        { id: 'ST008', domain: 'Security', issue: 'No encryption for sensitive data', source: '15', tags: ['Incomplete'] },
        { id: 'ST009', domain: 'Data Quality', issue: 'No validation for course suggestions', source: '12a & 12b, p.20', tags: ['Incomplete', 'Ambiguous', 'Untestable'] },
        { id: 'ST010', domain: 'UI', issue: '"As little icons" subjective', source: '16a', tags: ['Ambiguous', 'Untestable'] },
        { id: 'ST011', domain: 'Functionality', issue: '"Fast movements" lacks triggers', source: '1b, p.3', tags: ['Incomplete', 'Ambiguous', 'Untestable'] },
        { id: 'ST012', domain: 'Functionality', issue: 'Personal criteria vague', source: '17F, p.17', tags: ['Incomplete', 'Ambiguous'] },
        { id: 'ST013', domain: 'Business Process', issue: 'Advisor approval conflict', source: '1a vs 6b, p.1 & 9', tags: ['Inconsistent'] },
        { id: 'ST014', domain: 'Functionality', issue: 'Schedule proposal criteria missing', source: 'Req #1F, p.12', tags: ['Incomplete', 'Ambiguous', 'Untestable'] },
        { id: 'ST015', domain: 'UI', issue: 'Vague terms: "easily", "efficiently"', source: '10b', tags: ['Ambiguous', 'Untestable'] },
        { id: 'ST016', domain: 'UI', issue: '"Self-explanatory" vs tutorial conflict', source: '11c', tags: ['Inconsistent', 'Unfeasible'] },
        { id: 'ST017', domain: 'Functionality', issue: 'No specific IT services listed', source: '13b', tags: ['Incomplete'] },
        { id: 'ST018', domain: 'Compliance', issue: 'No browser standards or testing', source: '14c', tags: ['Incomplete', 'Ambiguous', 'Untestable'] },
        { id: 'ST019', domain: 'Security', issue: 'No threat modeling or thresholds', source: '15d', tags: ['Incomplete', 'Ambiguous', 'Untestable'] },
        { id: 'ST020', domain: 'Reliability', issue: 'No data persistence or recovery limits', source: '12c', tags: ['Incomplete', 'Ambiguous'] },
    ];

    const risks = [
        { id: 'RS001', fail: 'Email delay → user deleted', rpn: 6, action: 'Retry + alert', trace: '1.6, p.4' },
        { id: 'RS002', fail: 'Booking not saved', rpn: 2, action: 'DB check', trace: '2.2.11, p.5' },
        { id: 'RS003', fail: 'UI cut off on scroll', rpn: 12, action: 'Responsive test', trace: '2.3.3, p.5' },
        { id: 'RS004', fail: 'Table lock abandonment', rpn: 6, action: 'Auto release', trace: '3.5, p.6' },
        { id: 'RS005', fail: 'Monthly review delay', rpn: 4, action: 'Auto monitoring', trace: '4.6.2, p.7' },
        { id: 'RS006', fail: 'Invalid booking mod', rpn: 6, action: 'Validation', trace: '2.5.4, p.5' },
        { id: 'RS007', fail: 'Ads clutter UI', rpn: 12, action: 'Limit ads', trace: '5.1, p.8' },
        { id: 'RS008', fail: 'Crash >100 users', rpn: 2, action: 'Load test', trace: '4.4.2, p.7' },
        { id: 'RS009', fail: 'Public data exposure', rpn: 2, action: 'Anonymise', trace: '2.6.4, p.6' },
        { id: 'RS010', fail: 'Invalid email/phone', rpn: 6, action: 'Validation', trace: '3.1, p.6' },
        { id: 'RS011', fail: 'Silent confirmation fail', rpn: 2, action: 'Add message', trace: '2.2.10, p.4' },
        { id: 'RS012', fail: 'No first-time help', rpn: 12, action: 'Onboarding', trace: '5.1, p.8' },
        { id: 'RS013', fail: 'Modify others booking', rpn: 12, action: 'Auth check', trace: '2.5.2' },
        { id: 'RS014', fail: 'Slow load peak hours', rpn: 6, action: 'Caching', trace: '2.2.2, p.4' },
        { id: 'RS015', fail: 'Failover >30s', rpn: 6, action: 'Stress test', trace: '4.4 & 4.5' },
        { id: 'RS016', fail: 'Poor mobile UX', rpn: 8, action: 'Mobile-first', trace: '1.6, p.3' },
        { id: 'RS017', fail: 'No rollback on update', rpn: 4, action: 'Version control', trace: '4.5.1, p.7' },
        { id: 'RS018', fail: 'No localisation', rpn: 20, action: 'Multilingual', trace: '5.1, p.8' },
        { id: 'RS019', fail: 'No admin layout panel', rpn: 9, action: 'Build panel', trace: '2.2.4' },
        { id: 'RS020', fail: 'Late cancel disrupts', rpn: 6, action: '1hr cutoff', trace: '2.5, p.5' },
    ];

    return (
        <motion.div variants={fadeIn} initial="hidden" animate="visible" style={sectionStyle(theme)}>
            <h2 style={titleStyle(theme)}>Project 1: Static Testing & FMEA</h2>
            <p style={{ margin: '20px 0', fontSize: '1.1rem' }}>
                Reviewed <strong>University Online Registration Requirements Specification (23 pages, UTS Assignment)</strong> → Found <strong>20 defects + 20 risks</strong>.
            </p>

            {/* Tables */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '30px' }}>
                <div>
                    <h3>20 Defects (Traceable)</h3>
                    <div style={{ maxHeight: '500px', overflowY: 'auto', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                            <thead>
                                <tr style={{ background: theme.primary, color: 'white' }}>
                                    <th style={th}>ID</th><th style={th}>Domain</th><th style={th}>Issue</th><th style={th}>Source</th>
                                </tr>
                            </thead>
                            <tbody>
                                {defects.map(d => (
                                    <tr key={d.id}>
                                        <td style={td}><strong>{d.id}</strong></td>
                                        <td style={td}><Badge text={d.domain} color={theme.primary} /></td>
                                        <td style={td}>{d.issue}</td> {/* ← FIXED: {d.issue} */}
                                        <td style={td}><em>{d.source}</em></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div>
                    <h3>FMEA – Top Risks</h3>
                    <div style={{ maxHeight: '500px', overflowY: 'auto', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                            <thead>
                                <tr style={{ background: theme.danger, color: 'white' }}>
                                    <th style={th}>ID</th><th style={th}>Failure</th><th style={th}>RPN</th><th style={th}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {risks.sort((a, b) => b.rpn - a.rpn).map(r => (
                                    <tr key={r.id}>
                                        <td style={td}><strong>{r.id}</strong></td>
                                        <td style={td}>{r.fail}</td>
                                        <td style={td}><Badge text={r.rpn} color={r.rpn > 15 ? theme.danger : r.rpn > 10 ? theme.warning : theme.success} /></td>
                                        <td style={td}>{r.action}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Key Findings */}
            <div style={{ marginTop: '30px', padding: '20px', background: theme.warning + '20', borderRadius: '12px', border: `1px solid ${theme.warning}` }}>
                <h4 style={{ margin: '0 0 12px', color: '#92400E' }}>Key Findings</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    <li><strong>20 defects</strong> — 60% ambiguous, 50% incomplete</li>
                    <li><strong>ST013</strong>: Advisor approval conflict — <em>business-critical</em></li>
                    <li><strong>Security gaps</strong>: No password rules, no encryption</li>
                    <li><strong>FMEA Top Risk</strong>: RS018 (RPN 20) — localisation exclusion</li>
                </ul>
                <p style={{ margin: '12px 0 0', fontSize: '0.85rem', color: '#92400E', fontStyle: 'italic' }}>
                    Source: <strong>University Online Registration Requirements Specification</strong> (23 pages, UTS Assignment)
                </p>
                <a
                    href="https://1drv.ms/b/c/3e8e6f7a169e86a5/EYePPNVZBUlKtgRe2jtQAwsBOVMveXV5SJRrOAnlAn8U9Q?e=htp14d"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginTop: '8px',
                        color: theme.primary,
                        fontSize: '0.85rem',
                        textDecoration: 'none',
                        fontWeight: 500
                    }}
                >
                    View sample excerpt (Page 15a) <ExternalLink size={14} />
                </a>
            </div>
        </motion.div>
    );
}

function Project2({ theme, isDark }) {
    return (
        <motion.div variants={fadeIn} initial="hidden" animate="visible" style={sectionStyle(theme)}>
            <h2 style={titleStyle(theme)}>Project 2: Unit Testing (Black & White Box)</h2>
            <p style={{ margin: '20px 0', fontSize: '1.1rem' }}>
                Designed <strong>37 test cases</strong> for <code>binarySearch(int[] arr, int x)</code> — an <strong>iterative binary search</strong> in C++ with <code>O(log n)</code> complexity.
            </p>

            {/* Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', margin: '24px 0' }}>
                <div style={{ background: theme.primary + '15', padding: '16px', borderRadius: '12px', textAlign: 'center', border: `1px solid ${theme.primary}` }}>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: theme.primary }}>100%</div>
                    <div style={{ fontSize: '0.9rem', color: theme.text }}>Statement Coverage</div>
                </div>
                <div style={{ background: theme.success + '15', padding: '16px', borderRadius: '12px', textAlign: 'center', border: `1px solid ${theme.success}` }}>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: theme.success }}>All Paths</div>
                    <div style={{ fontSize: '0.9rem', color: theme.text }}>Path Coverage</div>
                </div>
                <div style={{ background: theme.warning + '15', padding: '16px', borderRadius: '12px', textAlign: 'center', border: `1px solid ${theme.warning}` }}>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: theme.warning }}>8</div>
                    <div style={{ fontSize: '0.9rem', color: theme.text }}>Equivalence Classes</div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '30px' }}>
                <div>
                    <h3 style={{ color: theme.primary, fontWeight: 600, marginBottom: '16px' }}>Black-Box Testing</h3>
                    <MethodCard method="Input Partitioning" tests={8} desc="Null, empty, 1 elem, 2–100, unsorted, size >100" theme={theme} />
                    <MethodCard method="Output Partitioning" tests={5} desc="Valid index, -1, Exception" theme={theme} />
                    <MethodCard method="Boundary Value" tests={10} desc="n=0,1,100,101; x=min-1, max+1" theme={theme} />
                </div>
                <div>
                    <h3 style={{ color: theme.primary, fontWeight: 600, marginBottom: '16px' }}>White-Box Testing</h3>
                    <MethodCard method="Statement Coverage" tests={4} desc="100% line execution" theme={theme} />
                    <MethodCard method="Decision Coverage" tests={4} desc="All branches (true/false)" theme={theme} />
                    <MethodCard method="Loop Coverage" tests={4} desc="0, 1, multiple iterations" theme={theme} />
                    <MethodCard method="Path Coverage" tests={5} desc="P0, P1a, P1b, P2a, P2b" theme={theme} />
                </div>
            </div>

            {/* Sample Test Cases */}
            <div style={{ marginTop: '32px' }}>
                <h4 style={{ color: theme.text, fontWeight: 600, marginBottom: '12px' }}>Sample Test Cases</h4>
                <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                        <thead>
                            <tr style={{ background: theme.primary, color: 'white' }}>
                                <th style={th}>Test ID</th>
                                <th style={th}>Input</th>
                                <th style={th}>Expected</th>
                                <th style={th}>Coverage</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td style={td}><code>T1</code></td><td style={td}><code>null, 5</code></td><td style={td}>Exception</td><td style={td}>P1</td></tr>
                            <tr><td style={td}><code>T2</code></td><td style={td}><code>[], 10</code></td><td style={td}>-1</td><td style={td}>P2</td></tr>
                            <tr><td style={td}><code>T3</code></td><td style={td}><code>[7], 7</code></td><td style={td}>0</td><td style={td}>P3</td></tr>
                            <tr><td style={td}><code>T5</code></td><td style={td}><code>[1,3,5,7], 5</code></td><td style={td}>2</td><td style={td}>P4</td></tr>
                            <tr><td style={td}><code>T7</code></td><td style={td}><code>[1..101], 10</code></td><td style={td}>Exception</td><td style={td}>P5</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Source Code — WARNA SESUAI DARK MODE */}
            <div style={{ marginTop: '32px' }}>
                <h4 style={{ color: theme.text, fontWeight: 600, marginBottom: '16px' }}>
                    Source Code (C++ – Annotated)
                </h4>

                <div style={{
                    background: isDark ? '#0d1117' : '#f6f8fa',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                    fontFamily: 'Consolas, "Courier New", monospace',
                    border: `1px solid ${isDark ? '#30363d' : '#d0d7de'}`
                }}>
                    {/* Header */}
                    <div style={{
                        background: isDark ? '#161b22' : '#ffffff',
                        padding: '8px 16px',
                        fontSize: '0.8rem',
                        color: isDark ? '#8b949e' : '#57606a',
                        borderBottom: `1px solid ${isDark ? '#30363d' : '#d0d7de'}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <div style={{ width: '10px', height: '10px', background: '#f85149', borderRadius: '50%' }}></div>
                        <div style={{ width: '10px', height: '10px', background: '#f0883e', borderRadius: '50%' }}></div>
                        <div style={{ width: '10px', height: '10px', background: '#3fb950', borderRadius: '50%' }}></div>
                        <span style={{ marginLeft: '8px', fontWeight: 500 }}>binarySearch.cpp</span>
                    </div>

                    {/* Code + Line Numbers */}
                    <div style={{ display: 'flex' }}>
                        <div style={{
                            background: isDark ? '#0d1117' : '#f6f8fa',
                            padding: '20px 8px 20px 16px',
                            color: isDark ? '#6e7681' : '#57606a',
                            fontSize: '0.85rem',
                            textAlign: 'right',
                            userSelect: 'none',
                            borderRight: `1px solid ${isDark ? '#30363d' : '#d0d7de'}`,
                            minWidth: '50px'
                        }}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(n => (
                                <div key={n} style={{ height: '1.6em', lineHeight: '1.6em' }}>{n}</div>
                            ))}
                        </div>

                        {/* Code */}
                        <div style={{ padding: '20px', flex: 1, fontSize: '0.9rem', lineHeight: '1.6em', color: isDark ? '#f0f6fc' : '#24292f' }}>
                            <div>
                                <span style={{ color: isDark ? '#79c0ff' : '#0550ae' }}>int</span>{' '}
                                <span style={{ color: isDark ? '#d2a8ff' : '#8250df' }}>binarySearch</span>
                                <span style={{ color: isDark ? '#79c0ff' : '#0550ae' }}>(int arr[], int x)</span> &#123;
                            </div>
                            <div style={{ marginLeft: '1.5em' }}>
                                {'  '}<span style={{ color: isDark ? '#79c0ff' : '#0550ae' }}>int</span> low = <span style={{ color: isDark ? '#79c0ff' : '#0a3069' }}>0</span>;
                                {' '}<span style={{ color: isDark ? '#8b949e' : '#6e7781' }}>{'// Initialize'}</span>
                            </div>
                            <div style={{ marginLeft: '1.5em' }}>
                                {'  '}<span style={{ color: isDark ? '#79c0ff' : '#0550ae' }}>int</span> high = arr.<span style={{ color: isDark ? '#d2a8ff' : '#8250df' }}>size</span>() - <span style={{ color: isDark ? '#79c0ff' : '#0a3069' }}>1</span>;
                                {' '}<span style={{ color: isDark ? '#8b949e' : '#6e7781' }}>{'// Boundary'}</span>
                            </div>
                            <div style={{ marginLeft: '1.5em' }}>
                                {'  '}<span style={{ color: isDark ? '#ff7b72' : '#cf222e' }}>while</span> (low &lt;= high) &#123;
                                {' '}<span style={{ color: isDark ? '#7ee787' : '#116329' }}>{'// Loop coverage'}</span>
                            </div>
                            <div style={{ marginLeft: '3em' }}>
                                {'    '}<span style={{ color: isDark ? '#79c0ff' : '#0550ae' }}>int</span> mid = low + (high - low) / <span style={{ color: isDark ? '#79c0ff' : '#0a3069' }}>2</span>;
                                {' '}<span style={{ color: isDark ? '#8b949e' : '#6e7781' }}>{'// Avoid overflow'}</span>
                            </div>
                            <div style={{ marginLeft: '3em' }}>
                                {'    '}<span style={{ color: isDark ? '#ff7b72' : '#cf222e' }}>if</span> (arr[mid] == x)
                            </div>
                            <div style={{ marginLeft: '4.5em' }}>
                                {'      '}<span style={{ color: isDark ? '#ff7b72' : '#cf222e' }}>return</span> mid;
                                {' '}<span style={{ color: isDark ? '#79c0ff' : '#0550ae' }}>{'// Found → P1a'}</span>
                            </div>
                            <div style={{ marginLeft: '3em' }}>
                                {'    '}<span style={{ color: isDark ? '#ff7b72' : '#cf222e' }}>if</span> (arr[mid] &lt; x)
                            </div>
                            <div style={{ marginLeft: '4.5em' }}>
                                {'      '}low = mid + <span style={{ color: isDark ? '#79c0ff' : '#0a3069' }}>1</span>;
                                {' '}<span style={{ color: isDark ? '#79c0ff' : '#0550ae' }}>{'// Search right'}</span>
                            </div>
                            <div style={{ marginLeft: '3em' }}>
                                {'    '}<span style={{ color: isDark ? '#ff7b72' : '#cf222e' }}>else</span>
                            </div>
                            <div style={{ marginLeft: '4.5em' }}>
                                {'      '}high = mid - <span style={{ color: isDark ? '#79c0ff' : '#0a3069' }}>1</span>;
                                {' '}<span style={{ color: isDark ? '#79c0ff' : '#0550ae' }}>{'// Search left'}</span>
                            </div>
                            <div style={{ marginLeft: '1.5em' }}>{'  &#125;'}</div>
                            <div style={{ marginLeft: '1.5em' }}>
                                {'  '}<span style={{ color: isDark ? '#ff7b72' : '#cf222e' }}>return</span> <span style={{ color: isDark ? '#f85149' : '#a40e26' }}>-1</span>;
                                {' '}<span style={{ color: isDark ? '#f85149' : '#a40e26' }}>{'// Not found → P0'}</span>
                            </div>
                            <div>&#125;</div>
                        </div>
                    </div>

                    {/* Legend */}
                    <div style={{
                        background: isDark ? '#161b22' : '#ffffff',
                        padding: '10px 20px',
                        fontSize: '0.75rem',
                        color: isDark ? '#8b949e' : '#57606a',
                        borderTop: `1px solid ${isDark ? '#30363d' : '#d0d7de'}`,
                        display: 'flex',
                        gap: '16px',
                        flexWrap: 'wrap'
                    }}>
                        <span style={{ color: isDark ? '#7ee787' : '#116329' }}>Loop</span>
                        <span style={{ color: isDark ? '#79c0ff' : '#0550ae' }}> Path P1a</span>
                        <span style={{ color: isDark ? '#f85149' : '#a40e26' }}> Path P0</span>
                        <span style={{ color: isDark ? '#8b949e' : '#6e7781' }}>Comments</span>
                    </div>

                    {/* Key Insight */}
                    <div style={{
                        marginTop: '20px',
                        padding: '16px 20px',
                        background: theme.success + '15',
                        border: `1px solid ${theme.success}`,
                        borderRadius: '12px',
                        fontSize: '0.95rem'
                    }}>
                        <strong style={{ color: theme.success }}>Key Insight:</strong>{' '}
                        Achieved <strong>100% statement & path coverage</strong> with only <strong>37 targeted tests</strong> — proving efficiency in test design.
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
function Project3({ theme, isDark }) {
    const testResults = [
        { id: 'T001', func: 'Search Product', result: 'PASS', tool: 'Selenium (Python)', tester: 'Me' },
        { id: 'T002', func: 'Login Fail', result: 'PASS', tool: 'Selenium (Python)', tester: 'Me' },
        { id: 'T003', func: 'Contact Form', result: 'FAIL', tool: 'TestCafe (JS)', tester: 'Me' },
        { id: 'T004', func: 'Add to Cart', result: 'PASS', tool: 'TestCafe (JS)', tester: 'Team' },
        { id: 'T005', func: 'View/Edit Cart', result: 'PASS', tool: 'TestCafe (JS)', tester: 'Team' },
        { id: 'T006', func: 'Checkout', result: 'PASS', tool: 'TestCafe (JS)', tester: 'Team' },
        { id: 'T007', func: 'User Registration', result: 'PASS', tool: 'TestCafe (JS)', tester: 'Team' },
        { id: 'T008', func: 'User Login', result: 'PASS', tool: 'TestCafe (JS)', tester: 'Team' },
        { id: 'T009', func: 'User Logout', result: 'PASS', tool: 'TestCafe (JS)', tester: 'Team' },
    ];

    const passRate = ((testResults.filter(t => t.result === 'PASS').length / testResults.length) * 100).toFixed(2);

    // Apple-style scroll animation variants
    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    const childVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const buttonVariants = {
        hover: { scale: 1.04, transition: { type: "spring", stiffness: 400, damping: 25 } },
        tap: { scale: 0.98 }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={sectionVariants}
            style={sectionStyle(theme)}
        >
            {/* === BANNER === */}
            <motion.div
                variants={childVariants}
                style={{
                    background: `linear-gradient(135deg, ${theme.primary}12, ${theme.light}08)`,
                    padding: '28px 36px',
                    borderRadius: '24px',
                    border: `1px solid ${theme.primary}25`,
                    textAlign: 'center',
                    marginBottom: '60px',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.08)'
                }}
            >
                <h3 style={{ margin: 0, color: theme.primary, fontWeight: 700, fontSize: '1.8rem', letterSpacing: '-0.6px' }}>
                    Group Project • 3 Members • 88.89% Pass Rate
                </h3>
                <p style={{ margin: '12px 0 0', fontSize: '1.15rem', color: theme.text, opacity: 0.92, fontWeight: 500 }}>
                    End-to-End Automation on <strong>Poco Mega Store</strong>
                </p>
            </motion.div>

            {/* === 1. OVERVIEW + ANIMATED BUTTON === */}
            <motion.div variants={childVariants} style={{ marginBottom: '64px' }}>
                <h3 style={{ color: theme.primary, fontWeight: 700, marginBottom: '22px', fontSize: '1.6rem', letterSpacing: '-0.4px' }}>
                    1. Overview
                </h3>
                <p style={{ fontSize: '1.12rem', lineHeight: 1.9, color: theme.text, maxWidth: '820px', marginBottom: '28px' }}>
                    Automated testing of a live e-commerce platform using <strong>Selenium</strong> and <strong>TestCafe</strong> to validate user flows.
                </p>

                {/* APPLE-STYLE BUTTON WITH ARROW PULSE */}
                <motion.a
                    href="https://ecommerce-playground.lambdatest.io"
                    target="_blank"
                    rel="noopener"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '16px 32px',
                        background: theme.primary,
                        color: 'white',
                        borderRadius: '18px',
                        fontWeight: 600,
                        fontSize: '1.05rem',
                        textDecoration: 'none',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
                        letterSpacing: '-0.2px'
                    }}
                >
                    View Live Site
                    <motion.div
                        animate={{ x: [0, 6, 0] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                    >
                        <ArrowRight size={20} />
                    </motion.div>
                </motion.a>
            </motion.div>

            {/* === 2. FUNCTIONS === */}
            <motion.div variants={childVariants} style={{ marginBottom: '64px' }}>
                <h3 style={{ color: theme.primary, fontWeight: 700, marginBottom: '24px', fontSize: '1.6rem' }}>
                    2. Functions Tested (9)
                </h3>
                <div style={{ overflowX: 'auto', borderRadius: '20px', border: `1px solid ${theme.primary}25`, background: theme.surface, boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.98rem' }}>
                        <thead>
                            <tr style={{ background: theme.primary, color: 'white' }}>
                                <th style={{ ...th, padding: '18px' }}>ID</th>
                                <th style={{ ...th, padding: '18px' }}>Function</th>
                                <th style={{ ...th, padding: '18px' }}>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['F1', 'User Registration', 'Name, email, password + privacy'],
                                ['F2', 'User Login', 'Valid credentials'],
                                ['F3', 'Search Product', 'Keyword & category'],
                                ['F4', 'Add to Cart', 'Hover or product page'],
                                ['F5', 'View/Edit Cart', 'Modify quantity'],
                                ['F6', 'Checkout', 'Proceed to payment'],
                                ['F7', 'Login Fail', 'Invalid login → error'],
                                ['F8', 'Contact Form', 'Name, email, message'],
                                ['F9', 'User Logout', 'End session'],
                            ].map(([id, name, desc], i) => (
                                <motion.tr
                                    key={id}
                                    variants={childVariants}
                                    custom={i}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    style={{ borderBottom: `1px solid ${theme.primary}12` }}
                                >
                                    <td style={{ ...td, padding: '16px' }}><code style={{ fontWeight: 600, fontSize: '0.9rem' }}>{id}</code></td>
                                    <td style={{ ...td, padding: '16px' }}><strong>{name}</strong></td>
                                    <td style={{ ...td, padding: '16px', color: theme.text + 'e0' }}>{desc}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* === 3. MY ROLE === */}
            <motion.div
                variants={childVariants}
                style={{
                    marginBottom: '64px',
                    padding: '32px',
                    background: `linear-gradient(145deg, ${theme.surface}, ${theme.surface}ee)`,
                    borderRadius: '24px',
                    border: `1px solid ${theme.primary}25`,
                    boxShadow: '0 12px 40px rgba(0,0,0,0.1)'
                }}
            >
                <h3 style={{ color: theme.primary, fontWeight: 700, margin: '0 0 18px', fontSize: '1.6rem' }}>
                    3. My Role
                </h3>
                <p style={{ margin: 0, fontSize: '1.12rem', lineHeight: 1.9 }}>
                    I authored <strong>3 critical test cases</strong>:
                </p>
                <ul style={{ margin: '18px 0', paddingLeft: '32px', fontSize: '1.08rem', lineHeight: 2 }}>
                    <li><strong>F3</strong>: Product Search (Selenium)</li>
                    <li><strong>F7</strong>: Login Failure Handling</li>
                    <li><strong>F8</strong>: Contact Form → <em>Detected critical UX bug</em></li>
                </ul>
            </motion.div>
            {/* === 4. GANTT CHART === */}
            <motion.div variants={childVariants} style={{ marginBottom: '64px' }}>
                <h3 style={{ color: theme.primary, fontWeight: 700, marginBottom: '28px', fontSize: '1.6rem' }}>
                    4. Project Timeline
                </h3>

                {/* RESPONSIVE GRID: 1 col on mobile, 2 on desktop */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '28px'
                }}>
                    {[1, 2].map((i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -6, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                            style={{
                                borderRadius: '24px',
                                overflow: 'hidden',
                                boxShadow: '0 15px 45px rgba(0,0,0,0.14)',
                                background: theme.surface,
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            {/* Title */}
                            <div style={{
                                padding: '16px 24px',
                                background: `linear-gradient(to right, ${theme.primary}, ${theme.light})`,
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '1rem'
                            }}>
                                Gantt Chart – Part {i}
                            </div>

                            {/* IMAGE: Full bleed, no white frame, curved bottom */}
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => window.open(i === 1 ? '/STQMGC.png' : '/STQMGC2.png', '_blank')}
                                style={{
                                    flex: 1,
                                    minHeight: '480px',
                                    background: isDark ? '#0f172a' : '#f8f9fa',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'zoom-in',
                                    borderRadius: '0 0 24px 24px',
                                    overflow: 'hidden'
                                }}
                            >
                                <motion.img
                                    src={i === 1 ? '/STQMGC.png' : '/STQMGC2.png'}
                                    alt={`Gantt Chart Part ${i}`}
                                    initial={{ scale: 0.96 }}
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        padding: '16px', // Keeps image from touching edges
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* === 5. TEST ENVIRONMENT === */}
            <motion.div variants={childVariants} style={{ marginBottom: '64px' }}>
                <h3 style={{ color: theme.primary, fontWeight: 700, marginBottom: '24px', fontSize: '1.6rem' }}>
                    5. Test Environment
                </h3>
                <div style={{
                    background: theme.surface,
                    padding: '28px',
                    borderRadius: '20px',
                    border: `1px solid ${theme.primary}25`,
                    fontSize: '1.05rem',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
                }}>
                    <ul style={{ margin: 0, paddingLeft: '28px', lineHeight: 2 }}>
                        <li><strong>Platform</strong>: macOS (Apple Silicon M2)</li>
                        <li><strong>Browser</strong>: Chrome 129+</li>
                        <li><strong>Tools</strong>: Selenium (Python), TestCafe (JS), VS Code</li>
                        <li><strong>Setup</strong>: <code style={{ background: theme.primary + '18', padding: '3px 8px', borderRadius: '8px', fontSize: '0.9rem' }}>brew install python node chromedriver</code></li>
                    </ul>
                </div>
            </motion.div>

            {/* === 6. TEST RESULTS === */}
            <motion.div variants={childVariants} style={{ marginBottom: '64px' }}>
                <h3 style={{ color: theme.primary, fontWeight: 700, marginBottom: '24px', fontSize: '1.6rem' }}>
                    6. Test Results
                </h3>
                <div style={{ overflowX: 'auto', borderRadius: '20px', border: `1px solid ${theme.primary}25`, boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.98rem' }}>
                        <thead>
                            <tr style={{ background: theme.primary, color: 'white' }}>
                                <th style={{ ...th, padding: '18px' }}>ID</th>
                                <th style={{ ...th, padding: '18px' }}>Function</th>
                                <th style={{ ...th, padding: '18px' }}>Result</th>
                                <th style={{ ...th, padding: '18px' }}>Tool</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testResults.map((t, i) => (
                                <motion.tr
                                    key={t.id}
                                    variants={childVariants}
                                    custom={i}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    style={{ borderBottom: `1px solid ${theme.primary}12` }}
                                >
                                    <td style={{ ...td, padding: '16px' }}><code>{t.id}</code></td>
                                    <td style={{ ...td, padding: '16px' }}>{t.func}</td>
                                    <td style={{ ...td, padding: '16px', textAlign: 'center' }}>
                                        <span style={{
                                            padding: '7px 14px',
                                            borderRadius: '14px',
                                            fontSize: '0.88rem',
                                            fontWeight: 600,
                                            background: t.result === 'PASS' ? theme.success + '18' : theme.danger + '18',
                                            color: t.result === 'PASS' ? theme.success : theme.danger,
                                            border: `1px solid ${t.result === 'PASS' ? theme.success : theme.danger}`
                                        }}>
                                            {t.result}
                                        </span>
                                    </td>
                                    <td style={{ ...td, padding: '16px' }}><em>{t.tool}</em></td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.4rem', fontWeight: 700, color: theme.success }}>
                    Pass Rate: {passRate}% (8/9)
                </div>
            </motion.div>

            {/* === 7. CODE SAMPLES === */}
            <motion.div variants={childVariants} style={{ marginBottom: '64px' }}>
                <h3 style={{ color: theme.primary, fontWeight: 700, marginBottom: '28px', fontSize: '1.6rem' }}>
                    7. Sample Code
                </h3>

                {/* Selenium */}
                <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 350 }}
                    style={{ marginBottom: '36px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 15px 45px rgba(0,0,0,0.14)' }}
                >
                    <div style={{ background: theme.primary, color: 'white', padding: '16px 24px', fontWeight: 600 }}>
                        T001: Search Product (Selenium Python)
                    </div>
                    <pre style={{
                        margin: 0,
                        background: isDark ? '#0d1117' : '#fafafa',
                        padding: '24px',
                        fontSize: '0.92rem',
                        overflowX: 'auto',
                        fontFamily: 'SF Mono, Consolas, monospace',
                        lineHeight: 1.7
                    }}>
                        {`from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

# initialise browser Chrome
driver = webdriver.Chrome()

try:
    # Step 1: open homepage
    driver.get("https://ecommerce-playground.lambdatest.io/")

    # Step 2: find search bar
    search_box = driver.find_element(By.NAME, "search")

    # Step 3: enter keyword
    search_box.send_keys("MacBook")

    # Step 4: press enter
    search_box.send_keys(Keys.RETURN)

    # Step 5: wait for results to load
    time.sleep(3)

    # Step 6: screenshot
    results = driver.find_elements(By.CSS_SELECTOR, ".product-thumb h4 a")
    if len(results) > 0:
        print("Search successful — products found.")
    else:
        print("No products found.")

    # Step 7: screenshot
    driver.save_screenshot("test_result.png")

    # Step 8: delay for manual screenshot 
    time.sleep(5)

finally:
    driver.quit()
`}
                    </pre>
                </motion.div>

                {/* TestCafe */}
                <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 350 }}
                    style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 15px 45px rgba(0,0,0,0.14)' }}
                >
                    <div style={{ background: theme.primary, color: 'white', padding: '16px 24px', fontWeight: 600 }}>
                        T003: Contact Form (TestCafe JS)
                    </div>
                    <pre style={{
                        margin: 0,
                        background: isDark ? '#0d1117' : '#fafafa',
                        padding: '24px',
                        fontSize: '0.92rem',
                        overflowX: 'auto',
                        fontFamily: 'SF Mono, Consolas, monospace',
                        lineHeight: 1.7
                    }}>
                        {`import { Selector } from 'testcafe';

fixture('Contact Form Submission')
    .page('https://ecommerce-playground.lambdatest.io/index.php?route=information/contact');

const nameInput = Selector('#input-name');
const emailInput = Selector('#input-email');
const enquiryInput = Selector('#input-enquiry');
const submitBtn = Selector('input[type="submit"]');

// check the actual message paragraph instead of .alert-success
const successText = Selector('#content p');

test('Submit contact form and verify success message', async t => {
    await t
        .typeText(nameInput, 'Yafie Farabi')
        .typeText(emailInput, 'yafie.farabi@student.uts.edu.au')
        .typeText(enquiryInput, 'Testing contact form submission via TestCafe.')
        .click(submitBtn);

    // Verify success message text
    await t
        .expect(successText.exists).ok('Success message paragraph should exist')
        .expect(successText.innerText).contains('Your enquiry has been successfully sent', 'Should confirm successful submission');

    await t.takeScreenshot({ path: 'contact_form_result.png', fullPage: false });
    await t.wait(5000);
});`}
                    </pre>
                </motion.div>
            </motion.div>

            {/* === 8. ANALYSIS === */}
            <motion.div
                variants={childVariants}
                style={{
                    padding: '36px',
                    background: `linear-gradient(145deg, ${theme.surface}, ${theme.surface}ff)`,
                    borderRadius: '24px',
                    border: `1px solid ${theme.primary}25`,
                    boxShadow: '0 18px 50px rgba(0,0,0,0.12)'
                }}
            >
                <h3 style={{ color: theme.primary, fontWeight: 700, margin: '0 0 22px', fontSize: '1.6rem' }}>
                    8. Analysis & Reflections
                </h3>
                <ul style={{ margin: 0, paddingLeft: '32px', fontSize: '1.12rem', lineHeight: 2 }}>
                    <li><strong>88.89% pass rate</strong> — Core user flows validated</li>
                    <li><strong>T003 failure</strong>: No confirmation → critical UX flaw</li>
                    <li>Used <strong>mixed automation stack</strong> for optimal coverage</li>
                    <li>Future: <strong>CI/CD pipeline + data-driven tests</strong></li>
                </ul>
                <p style={{ marginTop: '24px', fontStyle: 'italic', color: theme.text + 'cc', fontSize: '1.08rem' }}>
                    This project demonstrated how structured automation reveals real-world issues early.
                </p>
            </motion.div>
        </motion.div>
    );
}
function Overview({ theme }) {
    return (
        <motion.div variants={fadeIn} initial="hidden" animate="visible" style={sectionStyle(theme)}>
            <h2 style={titleStyle(theme)}>Full Testing Lifecycle</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '30px' }}>
                <FeatureCard icon={<FileText />} title="Project 1" desc="Static + FMEA: 40 issues" />
                <FeatureCard icon={<Code />} title="Project 2" desc="B/W-Box: 37 cases" />
                <FeatureCard icon={<Globe />} title="Project 3" desc="E2E: 88% pass" />
            </div>
        </motion.div>
    );
}

function Impact({ theme }) {
    return (
        <motion.div variants={fadeIn} initial="hidden" animate="visible" style={sectionStyle(theme)}>
            <h2 style={titleStyle(theme)}>Business Impact</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginTop: '30px' }}>
                <ImpactBox title="Bugs Prevented" value="60+" desc="Across lifecycle" />
                <ImpactBox title="Cost Saved" value="10x" desc="Early detection" />
                <ImpactBox title="Risk Reduced" value="88%" desc="Critical paths" />
            </div>
        </motion.div>
    );
}

// === REUSABLE COMPONENTS ===
const iconBtn = { background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '8px' };
// const ctaBtn = { background: 'white', color: '#5DADE2', padding: '14px 32px', borderRadius: '50px', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' };
const sectionStyle = (t) => ({ background: t.surface, padding: '40px', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' });
const titleStyle = (t) => ({ fontSize: '2rem', fontWeight: 700, textAlign: 'center', margin: '0 0 10px', color: t.text });
const th = { padding: '14px', textAlign: 'left', fontWeight: 600 };
const td = { padding: '12px', borderBottom: '1px solid #E2E8F0', fontSize: '0.85rem' };

function ImpactCard({ icon, value, label }) {
    return (
        <motion.div whileHover={{ y: -8 }} style={{ background: 'rgba(255,255,255,0.2)', padding: '20px 30px', borderRadius: '16px', minWidth: '160px', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{icon}</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'white' }}>{value}</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9, color: 'white' }}>{label}</div>
        </motion.div>
    );
}

function MethodCard({ method, tests, desc, theme }) {
    return (
        <motion.div whileHover={{ scale: 1.02 }} style={{
            background: theme.surface,
            padding: '15px',
            borderRadius: '12px',
            marginBottom: '15px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            border: `1px solid ${theme.primary}30`
        }}>
            <h4 style={{ margin: 0, color: theme.primary, fontWeight: 600 }}>{method}</h4>
            <p style={{ fontSize: '0.9rem', color: theme.text, opacity: 0.8 }}>
                <strong>{tests} tests:</strong> {desc}
            </p>
        </motion.div>
    );
}

function FeatureCard({ icon, title, desc }) {
    return (
        <motion.div whileHover={{ y: -8 }} style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', boxShadow: '0 8px 25px rgba(0,0,0,0.08)', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', color: '#5DADE2', marginBottom: '16px' }}>{icon}</div>
            <h3 style={{ margin: '0 0 12px', fontSize: '1.2rem' }}>{title}</h3>
            <p style={{ margin: 0, color: '#64748B', fontSize: '0.95rem' }}>{desc}</p>
        </motion.div>
    );
}

function ImpactBox({ title, value, desc }) {
    return (
        <motion.div whileHover={{ scale: 1.03 }} style={{ background: `linear-gradient(135deg, #A7C7E7 0%, #5DADE2 100%)`, color: 'white', padding: '30px', borderRadius: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '8px' }}>{value}</div>
            <h4 style={{ margin: '0 0 8px' }}>{title}</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>{desc}</p>
        </motion.div>
    );
}

function Badge({ text, color }) {
    return (
        <span style={{ background: color, color: 'white', padding: '4px 10px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 600, display: 'inline-block', margin: '2px' }}>
            {text}
        </span>
    );
}
//test
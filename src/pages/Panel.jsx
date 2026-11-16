import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import DataSerwareLogo from '../components/DataSerwareLogo';
import {
  Server, Terminal, Play, Square, RotateCw, AlertTriangle,
  Folder, FileText, Database, Shield, HardDrive, Cpu, Zap,
  Wifi, RefreshCw, Plus, Trash2, Download, ExternalLink,
  ChevronRight, CheckCircle2, X, Edit, Globe, CreditCard,
  Settings, Clock, Sparkles, Send, ArrowLeft
} from 'lucide-react';

export default function Panel() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { formatPrice } = useCurrency();

  // Active Server list
  const [servers, setServers] = useState([
    {
      id: 'ds-mc-01',
      name: 'DataSerware SMP - Ryzen 9 7950X',
      game: 'Minecraft: Paper 1.21.3',
      node: 'node-01.mumbai.dataserware.net',
      location: 'Mumbai, India',
      ip: '142.132.89.44',
      port: 25565,
      status: 'online', // 'online' | 'offline' | 'starting' | 'stopping'
      cpuMax: 400,
      cpuUsage: 18.4,
      memoryMax: 8192,
      memoryUsage: 4180,
      diskMax: 60,
      diskUsage: 18.6,
      uptime: '4d 18h 32m',
      networkIn: '1.4 MB/s',
      networkOut: '8.2 MB/s'
    },
    {
      id: 'ds-vps-02',
      name: 'Ubuntu 22.04 LTS Cloud VPS',
      game: 'Linux KVM Hypervisor',
      node: 'node-04.singapore.dataserware.net',
      location: 'Singapore',
      ip: '185.193.125.10',
      port: 22,
      status: 'online',
      cpuMax: 400,
      cpuUsage: 9.2,
      memoryMax: 16384,
      memoryUsage: 3820,
      diskMax: 160,
      diskUsage: 42.1,
      uptime: '12d 04h 15m',
      networkIn: '3.1 MB/s',
      networkOut: '14.8 MB/s'
    },
    {
      id: 'ds-pal-03',
      name: 'Palworld Dedicated Co-op',
      game: 'Palworld Unreal 5',
      node: 'node-02.frankfurt.dataserware.net',
      location: 'Frankfurt, Germany',
      ip: '144.76.12.88',
      port: 8211,
      status: 'offline',
      cpuMax: 200,
      cpuUsage: 0,
      memoryMax: 12288,
      memoryUsage: 0,
      diskMax: 50,
      diskUsage: 14.2,
      uptime: '0m',
      networkIn: '0 KB/s',
      networkOut: '0 KB/s'
    }
  ]);

  // Selected server for management
  const [selectedServerId, setSelectedServerId] = useState('ds-mc-01');
  const activeServer = servers.find(s => s.id === selectedServerId) || servers[0];

  // Panel Tabs: 'overview' | 'console' | 'files' | 'databases' | 'backups' | 'network' | 'settings'
  const [activeTab, setActiveTab] = useState('console');

  // Terminal & Console states
  const [consoleLogs, setConsoleLogs] = useState([
    '[12:49:10 INFO] [DataSerware-Core]: Initializing bare-metal physical node (AMD Ryzen 9 7950X, 16 Cores)...',
    '[12:49:11 INFO] [DataSerware-Shield]: 1.2 Tbps DDoS filter active on port 25565.',
    '[12:49:12 INFO] [Paper]: Loading Paper version 1.21.3-R0.1-SNAPSHOT (Git: 42a19c8)...',
    '[12:49:13 INFO] [Server]: Loading recipes and datapacks (default, paper)...',
    '[12:49:14 INFO] [Server]: Preparing start region for dimension minecraft:overworld',
    '[12:49:16 INFO] [Server]: Time elapsed: 1420 ms. Preparing spawn area: 100%',
    '[12:49:17 INFO] [Server]: Done (5.210s)! For help, type "help"',
    '[12:49:22 INFO] [UserConnect]: Player Steve [142.132.89.44:54210] logged in with entity id 120 at ([world]0.5, 64.0, 0.5)',
    '[12:49:25 INFO] [TPS-Monitor]: Current TPS = 20.0 (Memory: 4180 MB / 8192 MB free: 4012 MB)'
  ]);
  const [commandInput, setCommandInput] = useState('');
  const terminalBottomRef = useRef(null);

  // Dynamic live metric fluctuation
  const [liveCpu, setLiveCpu] = useState(activeServer.cpuUsage);
  const [liveRam, setLiveRam] = useState(activeServer.memoryUsage);

  // File Manager states
  const [files, setFiles] = useState([
    { name: 'server.properties', size: '1.2 KB', modified: 'Nov 16, 2026', type: 'file' },
    { name: 'paper-global.yml', size: '4.8 KB', modified: 'Nov 16, 2026', type: 'file' },
    { name: 'spigot.yml', size: '3.1 KB', modified: 'Nov 15, 2026', type: 'file' },
    { name: 'bukkit.yml', size: '2.4 KB', modified: 'Nov 15, 2026', type: 'file' },
    { name: 'eula.txt', size: '128 B', modified: 'Nov 14, 2026', type: 'file' },
    { name: 'plugins', size: '14 items', modified: 'Nov 16, 2026', type: 'dir' },
    { name: 'world', size: '820 MB', modified: 'Nov 16, 2026', type: 'dir' },
    { name: 'world_nether', size: '140 MB', modified: 'Nov 16, 2026', type: 'dir' },
    { name: 'logs', size: '12 MB', modified: 'Nov 16, 2026', type: 'dir' }
  ]);
  const [editingFile, setEditingFile] = useState(null);
  const [fileContent, setFileContent] = useState('');

  // Databases states
  const [databases, setDatabases] = useState([
    { id: 'db-1', host: 'mysql-01.dataserware.net:3306', name: 'smp_playerdata', user: 'ds_usr_89', pass: 'p@ss_DataSerware!2026', showPass: false },
    { id: 'db-2', host: 'mysql-01.dataserware.net:3306', name: 'smp_economy', user: 'ds_usr_90', pass: 'ec0_sec!9921', showPass: false }
  ]);
  const [newDbModal, setNewDbModal] = useState(false);
  const [newDbName, setNewDbName] = useState('');

  // Backups states
  const [backups, setBackups] = useState([
    { id: 'bk-1', name: 'Daily-AutoSnapshot-2026-11-16.tar.gz', size: '840 MB', date: 'Today at 04:00 AM', completed: true },
    { id: 'bk-2', name: 'Pre-PluginUpgrade-Backup.tar.gz', size: '812 MB', date: 'Nov 14, 2026', completed: true }
  ]);

  // Network allocations states
  const [allocations, setAllocations] = useState([
    { id: 'alloc-1', ip: activeServer.ip, port: activeServer.port, isPrimary: true, notes: 'Primary Minecraft Service' },
    { id: 'alloc-2', ip: activeServer.ip, port: 8123, isPrimary: false, notes: 'Dynmap Live Web Map' },
    { id: 'alloc-3', ip: activeServer.ip, port: 19132, isPrimary: false, notes: 'GeyserMC Bedrock Bridge' }
  ]);

  // Settings
  const [selectedJava, setSelectedJava] = useState('Java 21 LTS (Temurin)');
  const [autoRestartOnCrash, setAutoRestartOnCrash] = useState(true);

  // Power status action handler
  const handlePowerAction = (action) => {
    if (action === 'start') {
      setServers(servers.map(s => s.id === activeServer.id ? { ...s, status: 'starting' } : s));
      setConsoleLogs(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()} INFO] [DataSerware-Daemon]: Power action "START" sent by administrator.`,
        `[${new Date().toLocaleTimeString()} INFO] [System]: Allocating 8192 MB RAM on node "${activeServer.node}"...`,
        `[${new Date().toLocaleTimeString()} INFO] [Server]: Loading server container... Process started with PID 18290.`
      ]);
      setTimeout(() => {
        setServers(servers.map(s => s.id === activeServer.id ? { ...s, status: 'online' } : s));
        setConsoleLogs(prev => [
          ...prev,
          `[${new Date().toLocaleTimeString()} INFO] [Server]: Server marked as ONLINE. Listening on 0.0.0.0:${activeServer.port}`
        ]);
      }, 1500);
    } else if (action === 'restart') {
      setServers(servers.map(s => s.id === activeServer.id ? { ...s, status: 'starting' } : s));
      setConsoleLogs(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()} WARN] [Server]: Server restart initiated. Saving player chunks...`,
        `[${new Date().toLocaleTimeString()} INFO] [Server]: Saving worlds... done.`,
        `[${new Date().toLocaleTimeString()} INFO] [DataSerware-Daemon]: Container rebooting...`
      ]);
      setTimeout(() => {
        setServers(servers.map(s => s.id === activeServer.id ? { ...s, status: 'online' } : s));
        setConsoleLogs(prev => [
          ...prev,
          `[${new Date().toLocaleTimeString()} INFO] [Server]: Server reboot complete! Online on ${activeServer.ip}:${activeServer.port}`
        ]);
      }, 2000);
    } else if (action === 'stop') {
      setServers(servers.map(s => s.id === activeServer.id ? { ...s, status: 'stopping' } : s));
      setConsoleLogs(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()} INFO] [Server]: Stopping server... Saving chunks and disconnecting players.`
      ]);
      setTimeout(() => {
        setServers(servers.map(s => s.id === activeServer.id ? { ...s, status: 'offline', cpuUsage: 0, memoryUsage: 0 } : s));
        setConsoleLogs(prev => [
          ...prev,
          `[${new Date().toLocaleTimeString()} INFO] [DataSerware-Daemon]: Container stopped. Process exit code 0.`
        ]);
      }, 1200);
    } else if (action === 'kill') {
      setServers(servers.map(s => s.id === activeServer.id ? { ...s, status: 'offline', cpuUsage: 0, memoryUsage: 0 } : s));
      setConsoleLogs(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()} ERROR] [DataSerware-Daemon]: SIGKILL sent to PID. Container terminated immediately.`
      ]);
    }
  };

  // Handle command execution in console
  const handleSendCommand = (e) => {
    e.preventDefault();
    if (!commandInput.trim()) return;
    const cmd = commandInput.trim();
    const time = new Date().toLocaleTimeString();

    let responseLog = `[${time} INFO] Command received: ${cmd}`;

    if (cmd.toLowerCase() === 'help') {
      responseLog = `[${time} INFO] Available commands: help, tps, status, say <message>, op <player>, reload, stop, clear`;
    } else if (cmd.toLowerCase() === 'tps') {
      responseLog = `[${time} INFO] TPS from last 1m, 5m, 15m: 20.0, 20.0, 20.0 (DataSerware Ryzen 9 Core)`;
    } else if (cmd.toLowerCase() === 'status') {
      responseLog = `[${time} INFO] Server ${activeServer.name} is ${activeServer.status.toUpperCase()} | Uptime: ${activeServer.uptime} | Node: ${activeServer.node}`;
    } else if (cmd.toLowerCase().startsWith('say ')) {
      responseLog = `[${time} INFO] [Server] ${cmd.replace(/^say /i, '')}`;
    } else if (cmd.toLowerCase() === 'clear') {
      setConsoleLogs([]);
      setCommandInput('');
      return;
    } else if (cmd.toLowerCase() === 'stop') {
      handlePowerAction('stop');
      setCommandInput('');
      return;
    } else if (cmd.toLowerCase() === 'restart') {
      handlePowerAction('restart');
      setCommandInput('');
      return;
    } else if (cmd.toLowerCase() === 'start') {
      handlePowerAction('start');
      setCommandInput('');
      return;
    }

    setConsoleLogs(prev => [...prev, `> ${cmd}`, responseLog]);
    setCommandInput('');
  };

  // Scroll to bottom of terminal when logs change
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [consoleLogs]);

  // Subtle live metric fluctuation simulation
  useEffect(() => {
    if (activeServer.status !== 'online') {
      setLiveCpu(0);
      setLiveRam(0);
      return;
    }
    const interval = setInterval(() => {
      setLiveCpu(+(activeServer.cpuUsage + (Math.random() * 4 - 2)).toFixed(1));
      setLiveRam(Math.round(activeServer.memoryUsage + (Math.random() * 60 - 30)));
    }, 3000);
    return () => clearInterval(interval);
  }, [activeServer]);

  // Status badge renderer
  const renderStatus = (st) => {
    if (st === 'online') {
      return <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '3px 9px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>● ONLINE</span>;
    }
    if (st === 'starting') {
      return <span style={{ background: 'rgba(234, 179, 8, 0.15)', color: '#facc15', border: '1px solid rgba(234, 179, 8, 0.3)', padding: '3px 9px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>● STARTING</span>;
    }
    if (st === 'stopping') {
      return <span style={{ background: 'rgba(249, 115, 22, 0.15)', color: '#fb923c', border: '1px solid rgba(249, 115, 22, 0.3)', padding: '3px 9px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>● STOPPING</span>;
    }
    return <span style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '3px 9px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>● OFFLINE</span>;
  };

  // Open file for editing
  const handleOpenFile = (fileName) => {
    if (fileName === 'server.properties') {
      setFileContent(`# DataSerware Server Configuration
server-port=25565
server-ip=142.132.89.44
max-players=100
difficulty=hard
gamemode=survival
motd=\\u00A7bData Serware \\u00A78| \\u00A7aRyzen 9 Extreme SMP \\u00A77[1.21]
pvp=true
enable-command-block=true
view-distance=12
simulation-distance=8
network-compression-threshold=256
online-mode=true`);
    } else if (fileName === 'paper-global.yml') {
      setFileContent(`# PaperMC Global Configuration - Tuned by DataSerware
chunk-loading:
  min-load-radius: 2
  max-concurrent-loads: 500
timings:
  enabled: true
  verbose: false
async-chunks:
  threads: 4`);
    } else {
      setFileContent(`# File: ${fileName}\n# Managed via DataSerware Pterodactyl File Manager\nkey=value\nenabled=true`);
    }
    setEditingFile(fileName);
  };

  return (
    <div className="panel-wrapper" style={{ minHeight: '100vh', background: '#030816', color: '#f1f5f9', paddingBottom: '4rem' }}>

      {/* Subdomain Header Banner */}
      <div style={{
        background: 'linear-gradient(90deg, #030a16 0%, #071e33 50%, #030a16 100%)',
        borderBottom: '1px solid rgba(16, 185, 129, 0.25)',
        padding: '12px 0'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              color: '#34d399',
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '3px 8px',
              borderRadius: '6px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}>
              PORTAL C: SERVER CONTROL PANEL
            </span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', color: '#94a3b8' }}>
              Subdomain: <strong style={{ color: '#10b981' }}>panel.dataserware.com</strong>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Link
              to="/"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#cbd5e1', fontSize: '0.82rem', textDecoration: 'none' }}
              title="Switch to Main Marketing Site"
            >
              <Globe size={13} style={{ color: '#c084fc' }} />
              <span>Main Website</span>
            </Link>
            <span style={{ color: '#334155' }}>|</span>
            <Link
              to="/billing"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(192, 132, 252, 0.15)',
                border: '1px solid rgba(192, 132, 252, 0.35)',
                color: '#d8b4fe',
                fontSize: '0.82rem',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '6px',
                textDecoration: 'none'
              }}
              title="Switch to Client Area & Billing"
            >
              <CreditCard size={13} />
              <span>Client Area &amp; Billing &rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Control Panel Top Navbar */}
      <div style={{
        background: 'rgba(6, 14, 28, 0.9)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 1rem', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <DataSerwareLogo size={32} showText={true} portalTag="Pterodactyl Panel" />
          </div>

          {/* Quick Server Switcher Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>Active Node Server:</label>
            <select
              value={selectedServerId}
              onChange={(e) => setSelectedServerId(e.target.value)}
              style={{
                background: '#040e1e',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                color: '#c084fc',
                fontWeight: 700,
                fontSize: '0.85rem',
                padding: '6px 12px',
                borderRadius: '8px',
                fontFamily: 'JetBrains Mono, monospace'
              }}
            >
              {servers.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.ip}:{s.port})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Panel Content */}
      <div className="container" style={{ marginTop: '1.75rem' }}>

        {/* Server Status Header Card */}
        <div style={{
          background: 'linear-gradient(135deg, #110626 0%, #030c1b 100%)',
          border: '1px solid rgba(168, 85, 247, 0.25)',
          borderRadius: '20px',
          padding: '1.75rem',
          marginBottom: '1.5rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.25rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff', margin: 0, fontFamily: 'Outfit, sans-serif' }}>
                  {activeServer.name}
                </h1>
                {renderStatus(activeServer.status)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.82rem', color: '#94a3b8', flexWrap: 'wrap' }}>
                <span>Type: <strong style={{ color: '#fff' }}>{activeServer.game}</strong></span>
                <span>&bull;</span>
                <span>Node: <strong style={{ color: '#c084fc' }}>{activeServer.node}</strong></span>
                <span>&bull;</span>
                <span>Address: <strong style={{ color: '#d8b4fe', fontFamily: 'monospace' }}>{activeServer.ip}:{activeServer.port}</strong></span>
                <span>&bull;</span>
                <span>Uptime: <strong style={{ color: '#34d399' }}>{activeServer.uptime}</strong></span>
              </div>
            </div>

            {/* POWER BUTTONS */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => handlePowerAction('start')}
                disabled={activeServer.status === 'online' || activeServer.status === 'starting'}
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '9px 16px',
                  borderRadius: '8px',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  cursor: activeServer.status === 'online' ? 'not-allowed' : 'pointer',
                  opacity: activeServer.status === 'online' ? 0.5 : 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 0 14px rgba(16, 185, 129, 0.3)'
                }}
              >
                <Play size={14} /> Start
              </button>

              <button
                onClick={() => handlePowerAction('restart')}
                disabled={activeServer.status === 'offline'}
                style={{
                  background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '9px 16px',
                  borderRadius: '8px',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  cursor: activeServer.status === 'offline' ? 'not-allowed' : 'pointer',
                  opacity: activeServer.status === 'offline' ? 0.5 : 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <RotateCw size={14} /> Restart
              </button>

              <button
                onClick={() => handlePowerAction('stop')}
                disabled={activeServer.status === 'offline'}
                style={{
                  background: 'rgba(239, 68, 68, 0.2)',
                  border: '1px solid rgba(239, 68, 68, 0.5)',
                  color: '#f87171',
                  padding: '9px 16px',
                  borderRadius: '8px',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  cursor: activeServer.status === 'offline' ? 'not-allowed' : 'pointer',
                  opacity: activeServer.status === 'offline' ? 0.5 : 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Square size={14} /> Stop
              </button>

              <button
                onClick={() => handlePowerAction('kill')}
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#ef4444',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                title="Force Terminate"
              >
                <Zap size={14} /> Kill
              </button>
            </div>
          </div>

          {/* REAL-TIME RESOURCE USAGE METRIC BARS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            {/* CPU Metric */}
            <div style={{ background: '#030a16', borderRadius: '12px', padding: '12px 16px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '6px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Cpu size={13} style={{ color: '#c084fc' }} /> CPU Load</span>
                <strong style={{ color: '#c084fc' }}>{liveCpu}% / {activeServer.cpuMax}%</strong>
              </div>
              <div style={{ width: '100%', height: '6px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(100, (liveCpu / activeServer.cpuMax) * 100 * 2.5)}%`, height: '100%', background: 'linear-gradient(90deg, #c084fc, #d8b4fe)', transition: 'width 0.5s' }} />
              </div>
            </div>

            {/* RAM Metric */}
            <div style={{ background: '#030a16', borderRadius: '12px', padding: '12px 16px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '6px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Zap size={13} style={{ color: '#d8b4fe' }} /> Memory (RAM)</span>
                <strong style={{ color: '#d8b4fe' }}>{(liveRam / 1024).toFixed(1)} GB / {(activeServer.memoryMax / 1024)} GB</strong>
              </div>
              <div style={{ width: '100%', height: '6px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${(liveRam / activeServer.memoryMax) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #d8b4fe, #818cf8)', transition: 'width 0.5s' }} />
              </div>
            </div>

            {/* Disk Metric */}
            <div style={{ background: '#030a16', borderRadius: '12px', padding: '12px 16px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '6px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><HardDrive size={13} style={{ color: '#22c55e' }} /> NVMe Storage</span>
                <strong style={{ color: '#22c55e' }}>{activeServer.diskUsage} GB / {activeServer.diskMax} GB</strong>
              </div>
              <div style={{ width: '100%', height: '6px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${(activeServer.diskUsage / activeServer.diskMax) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #22c55e, #10b981)' }} />
              </div>
            </div>

            {/* Network Traffic */}
            <div style={{ background: '#030a16', borderRadius: '12px', padding: '12px 16px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '6px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Wifi size={13} style={{ color: '#a855f7' }} /> Network I/O</span>
                <strong style={{ color: '#c084fc' }}>{activeServer.networkIn} &darr; | {activeServer.networkOut} &uarr;</strong>
              </div>
              <div style={{ width: '100%', height: '6px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '45%', height: '100%', background: 'linear-gradient(90deg, #a855f7, #ec4899)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Panel Navigation Tabs (Pterodactyl Style) */}
        <div style={{ display: 'flex', gap: '6px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '2px', marginBottom: '1.5rem', overflowX: 'auto' }}>
          {[
            { id: 'console', label: 'Console Terminal', icon: Terminal },
            { id: 'files', label: 'File Manager', icon: Folder },
            { id: 'databases', label: 'Databases', icon: Database },
            { id: 'backups', label: 'Backups', icon: HardDrive },
            { id: 'network', label: 'Network / Ports', icon: Wifi },
            { id: 'settings', label: 'Startup & Settings', icon: Settings }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '9px 16px',
                  border: 'none',
                  background: active ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
                  color: active ? '#c084fc' : '#94a3b8',
                  borderBottom: active ? '2px solid #c084fc' : '2px solid transparent',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  borderRadius: '6px 6px 0 0',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: LIVE CONSOLE TERMINAL OUTPUT */}
        {activeTab === 'console' && (
          <div>
            <div style={{
              background: '#01050e',
              border: '1px solid rgba(168, 85, 247, 0.25)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.6)'
            }}>
              {/* Terminal Title Bar */}
              <div style={{ background: '#0d051f', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                  <span style={{ marginLeft: '8px', fontSize: '0.78rem', fontFamily: 'JetBrains Mono, monospace', color: '#94a3b8' }}>
                    container@{activeServer.node}:~/{activeServer.id}
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#34d399', fontFamily: 'JetBrains Mono, monospace' }}>
                  ● WebSocket Secure (wss://panel.dataserware.com)
                </div>
              </div>

              {/* Logs Stream Box */}
              <div style={{
                height: '420px',
                overflowY: 'auto',
                padding: '1.25rem',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.85rem',
                lineHeight: 1.6,
                color: '#cbd5e1'
              }}>
                {consoleLogs.map((log, index) => {
                  let color = '#cbd5e1';
                  if (log.startsWith('> ')) color = '#c084fc';
                  else if (log.includes('ERROR')) color = '#f87171';
                  else if (log.includes('WARN')) color = '#fbbf24';
                  else if (log.includes('DataSerware')) color = '#d8b4fe';
                  else if (log.includes('ONLINE') || log.includes('Done')) color = '#34d399';

                  return (
                    <div key={index} style={{ color, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                      {log}
                    </div>
                  );
                })}
                <div ref={terminalBottomRef} />
              </div>

              {/* Command Input Bar */}
              <form onSubmit={handleSendCommand} style={{ display: 'flex', borderTop: '1px solid rgba(255, 255, 255, 0.08)', background: '#030a16' }}>
                <span style={{ padding: '12px 14px', color: '#c084fc', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800 }}>&gt;</span>
                <input
                  type="text"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  placeholder="Type a server console command (e.g. help, tps, status, say Hello, stop)..."
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.88rem',
                    padding: '12px 0',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: 'rgba(168, 85, 247, 0.15)',
                    border: 'none',
                    color: '#c084fc',
                    padding: '0 20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontWeight: 700,
                    fontSize: '0.85rem'
                  }}
                >
                  <Send size={14} /> Send
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: FILE MANAGER */}
        {activeTab === 'files' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>
                <Folder size={16} style={{ color: '#c084fc' }} />
                <span>/home/container/</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleOpenFile('server.properties')}
                  style={{ background: 'rgba(168, 85, 247, 0.15)', border: '1px solid #c084fc', color: '#c084fc', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  + Create File
                </button>
                <button
                  onClick={() => alert('New directory created: /plugins/new-folder')}
                  style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#fff', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  + New Directory
                </button>
              </div>
            </div>

            <div style={{ background: '#110626', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '16px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: '#070213', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', color: '#94a3b8' }}>
                    <th style={{ padding: '12px 16px' }}>Name</th>
                    <th style={{ padding: '12px 16px' }}>Size</th>
                    <th style={{ padding: '12px 16px' }}>Last Modified</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <td style={{ padding: '12px 16px' }}>
                        <button
                          onClick={() => file.type === 'file' ? handleOpenFile(file.name) : alert(`Opened folder ${file.name}`)}
                          style={{ background: 'transparent', border: 'none', color: file.type === 'dir' ? '#d8b4fe' : '#fff', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                        >
                          {file.type === 'dir' ? <Folder size={15} style={{ color: '#c084fc' }} /> : <FileText size={15} style={{ color: '#94a3b8' }} />}
                          <span>{file.name}</span>
                        </button>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#94a3b8' }}>{file.size}</td>
                      <td style={{ padding: '12px 16px', color: '#94a3b8' }}>{file.modified}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                        {file.type === 'file' && (
                          <button
                            onClick={() => handleOpenFile(file.name)}
                            style={{ background: 'transparent', border: 'none', color: '#c084fc', cursor: 'pointer', marginRight: '10px' }}
                            title="Edit file"
                          >
                            <Edit size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => setFiles(files.filter(f => f.name !== file.name))}
                          style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                          title="Delete file"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* In-Panel Code/Config Editor Modal */}
            {editingFile && (
              <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1.5rem' }}>
                <div style={{ background: '#0d051f', border: '1px solid rgba(168, 85, 247, 0.35)', borderRadius: '20px', maxWidth: '750px', width: '100%', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileText size={18} style={{ color: '#c084fc' }} />
                      <strong style={{ color: '#fff', fontSize: '1rem' }}>Editing {editingFile}</strong>
                    </div>
                    <button
                      onClick={() => setEditingFile(null)}
                      style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div style={{ padding: '1rem 1.5rem', flex: 1, overflowY: 'auto' }}>
                    <textarea
                      rows={14}
                      value={fileContent}
                      onChange={(e) => setFileContent(e.target.value)}
                      style={{
                        width: '100%',
                        background: '#01050e',
                        border: '1px solid rgba(168, 85, 247, 0.2)',
                        borderRadius: '8px',
                        padding: '12px',
                        color: '#a5f3fc',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.85rem',
                        lineHeight: 1.6,
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <button
                      onClick={() => setEditingFile(null)}
                      style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#cbd5e1', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        alert(`Changes saved to ${editingFile}!`);
                        setEditingFile(null);
                      }}
                      style={{ background: 'linear-gradient(135deg, #c084fc, #a855f7)', color: '#070213', border: 'none', padding: '8px 20px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DATABASES */}
        {activeTab === 'databases' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', margin: 0 }}>MySQL Databases</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '4px 0 0' }}>Dedicated database instances allocated for this server node.</p>
              </div>
              <button
                onClick={() => setNewDbModal(true)}
                style={{ background: '#c084fc', color: '#070213', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer' }}
              >
                + New Database
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
              {databases.map(db => (
                <div key={db.id} style={{ background: '#110626', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '14px', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <Database size={20} style={{ color: '#c084fc' }} />
                    <strong style={{ fontSize: '1.05rem', color: '#fff' }}>{db.name}</strong>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem', color: '#cbd5e1' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#94a3b8' }}>Endpoint Host:</span>
                      <span style={{ fontFamily: 'monospace', color: '#c084fc' }}>{db.host}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#94a3b8' }}>Username:</span>
                      <span style={{ fontFamily: 'monospace' }}>{db.user}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#94a3b8' }}>Password:</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontFamily: 'monospace' }}>{db.showPass ? db.pass : '••••••••••••'}</span>
                        <button
                          onClick={() => setDatabases(databases.map(d => d.id === db.id ? { ...d, showPass: !d.showPass } : d))}
                          style={{ background: 'transparent', border: 'none', color: '#d8b4fe', fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                          {db.showPass ? 'Hide' : 'Reveal'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* New Database Modal */}
            {newDbModal && (
              <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
                <div style={{ background: '#110626', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '16px', padding: '1.75rem', maxWidth: '420px', width: '100%' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginTop: 0 }}>Create New Database</h3>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px' }}>Database Name</label>
                    <input
                      type="text"
                      value={newDbName}
                      onChange={(e) => setNewDbName(e.target.value)}
                      placeholder="e.g. smp_inventory"
                      style={{ width: '100%', background: '#070213', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '8px 12px', color: '#fff' }}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <button
                      onClick={() => setNewDbModal(false)}
                      style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#cbd5e1', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (newDbName.trim()) {
                          setDatabases([...databases, {
                            id: `db-${databases.length + 1}`,
                            host: 'mysql-01.dataserware.net:3306',
                            name: newDbName.trim(),
                            user: `ds_u${Math.floor(10 + Math.random() * 90)}`,
                            pass: 'dsw_pwd_' + Math.random().toString(36).substr(2, 6),
                            showPass: false
                          }]);
                        }
                        setNewDbModal(false);
                        setNewDbName('');
                      }}
                      style={{ background: '#c084fc', color: '#070213', border: 'none', padding: '6px 16px', borderRadius: '6px', fontWeight: 800, cursor: 'pointer' }}
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: BACKUPS */}
        {activeTab === 'backups' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', margin: 0 }}>Server Snapshots &amp; Backups</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '4px 0 0' }}>Automated daily snapshots stored offsite on redundant S3 clusters.</p>
              </div>
              <button
                onClick={() => {
                  const newBk = {
                    id: `bk-${backups.length + 1}`,
                    name: `Manual-Snapshot-${new Date().toISOString().split('T')[0]}.tar.gz`,
                    size: '835 MB',
                    date: 'Just now',
                    completed: true
                  };
                  setBackups([newBk, ...backups]);
                  alert('Snapshot created successfully!');
                }}
                style={{ background: '#c084fc', color: '#070213', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer' }}
              >
                + Create Snapshot Now
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {backups.map(bk => (
                <div key={bk.id} style={{ background: '#110626', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '12px', padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <HardDrive size={22} style={{ color: '#22c55e' }} />
                    <div>
                      <strong style={{ color: '#fff', fontSize: '0.95rem', display: 'block' }}>{bk.name}</strong>
                      <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Size: {bk.size} &bull; Created: {bk.date}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => alert(`Downloading backup ${bk.name}`)}
                      style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#fff', padding: '6px 12px', borderRadius: '6px', fontSize: '0.78rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Download size={12} /> Download
                    </button>
                    <button
                      onClick={() => alert(`Restoring backup ${bk.name}...`)}
                      style={{ background: 'rgba(192, 132, 252, 0.15)', border: '1px solid rgba(192, 132, 252, 0.4)', color: '#d8b4fe', padding: '6px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Restore
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: NETWORK / PORTS */}
        {activeTab === 'network' && (
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', margin: 0 }}>Port Allocations &amp; IP Addresses</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '4px 0 0' }}>Allocated IP addresses and forwarded ports for webmaps, proxies, and voice servers.</p>
            </div>

            <div style={{ background: '#110626', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '16px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: '#070213', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', color: '#94a3b8' }}>
                    <th style={{ padding: '12px 16px' }}>IP Address</th>
                    <th style={{ padding: '12px 16px' }}>Port</th>
                    <th style={{ padding: '12px 16px' }}>Assignment</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allocations.map(alloc => (
                    <tr key={alloc.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#c084fc' }}>{alloc.ip}</td>
                      <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#fff', fontWeight: 700 }}>{alloc.port}</td>
                      <td style={{ padding: '12px 16px', color: '#cbd5e1' }}>{alloc.notes}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                        {alloc.isPrimary ? (
                          <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>PRIMARY</span>
                        ) : (
                          <span style={{ background: 'rgba(192, 132, 252, 0.15)', color: '#d8b4fe', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem' }}>SECONDARY</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: STARTUP & SETTINGS */}
        {activeTab === 'settings' && (
          <div style={{ maxWidth: '640px', background: '#110626', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '16px', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginTop: 0 }}>Startup Configuration</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                  Java Runtime Version
                </label>
                <select
                  value={selectedJava}
                  onChange={(e) => setSelectedJava(e.target.value)}
                  style={{ width: '100%', background: '#070213', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '8px', padding: '10px 14px', color: '#fff' }}
                >
                  <option>Java 21 LTS (Temurin)</option>
                  <option>Java 17 LTS (Amazon Corretto)</option>
                  <option>Java 11 LTS (GraalVM)</option>
                  <option>Java 8 (Legacy)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                  Startup Flags (Aikar's Flags Enabled)
                </label>
                <input
                  type="text"
                  readOnly
                  value="-XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions"
                  style={{ width: '100%', background: '#070213', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '10px 14px', color: '#94a3b8', fontFamily: 'monospace', fontSize: '0.8rem' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: '#070213', borderRadius: '10px' }}>
                <div>
                  <strong style={{ color: '#fff', fontSize: '0.9rem', display: 'block' }}>Auto-Restart on Crash</strong>
                  <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Automatically trigger container restart if server crashes</span>
                </div>
                <input
                  type="checkbox"
                  checked={autoRestartOnCrash}
                  onChange={(e) => setAutoRestartOnCrash(e.target.checked)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Post from '../PostHook';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  forHost: {
    spacing: 1,
  },
});

// Sau này thay cái fakeData này bằng cái host là props truyền dô á
const fakeData = [
  {
    itemid: '29164',
    name: 'CPU guest nice time',
    key_: 'system.cpu.util[,guest_nice]',
    description:
      'Time spent running a niced guest (virtual CPU for guest operating systems under the control of the Linux kernel)',
    lastvalue: '0',
  },
  {
    itemid: '29165',
    name: 'CPU guest time',
    key_: 'system.cpu.util[,guest]',
    description:
      'Guest  time (time  spent  running  a  virtual  CPU  for  a  guest  operating  system)',
    lastvalue: '0',
  },
  {
    itemid: '29173',
    name: 'CPU idle time',
    key_: 'system.cpu.util[,idle]',
    description: 'The time the CPU has spent doing nothing.',
    lastvalue: '99.54985',
  },
  {
    itemid: '29167',
    name: 'CPU interrupt time',
    key_: 'system.cpu.util[,interrupt]',
    description:
      'The amount of time the CPU has been servicing hardware interrupts.',
    lastvalue: '0',
  },
  {
    itemid: '29162',
    name: 'CPU iowait time',
    key_: 'system.cpu.util[,iowait]',
    description: 'Amount of time the CPU has been waiting for I/O to complete.',
    lastvalue: '0.033317',
  },
  {
    itemid: '29169',
    name: 'CPU nice time',
    key_: 'system.cpu.util[,nice]',
    description:
      "The time the CPU has spent running users' processes that have been niced.",
    lastvalue: '0',
  },
  {
    itemid: '29166',
    name: 'CPU softirq time',
    key_: 'system.cpu.util[,softirq]',
    description:
      'The amount of time the CPU has been servicing software interrupts.',
    lastvalue: '0.016664',
  },
  {
    itemid: '29168',
    name: 'CPU steal time',
    key_: 'system.cpu.util[,steal]',
    description:
      "The amount of CPU 'stolen' from this virtual machine by the hypervisor for other tasks (such as running another virtual machine).",
    lastvalue: '0',
  },
  {
    itemid: '29172',
    name: 'CPU system time',
    key_: 'system.cpu.util[,system]',
    description:
      'The time the CPU has spent running the kernel and its processes.',
    lastvalue: '0.166694',
  },
  {
    itemid: '29171',
    name: 'CPU user time',
    key_: 'system.cpu.util[,user]',
    description:
      "The time the CPU has spent running users' processes that are not niced.",
    lastvalue: '0.266667',
  },
  {
    itemid: '29200',
    name: 'CPU utilization',
    key_: 'system.cpu.util',
    description: 'CPU utilization in %',
    lastvalue: '0.4501499999999936',
  },
  {
    itemid: '29163',
    name: 'Context switches per second',
    key_: 'system.cpu.switches',
    description: '',
    lastvalue: '149.18471641072856',
  },
  {
    itemid: '29181',
    name: 'Free swap space',
    key_: 'system.swap.size[,free]',
    description: 'The free space of swap volume/file in bytes.',
    lastvalue: '2147479552',
  },
  {
    itemid: '29182',
    name: 'Free swap space in %',
    key_: 'system.swap.size[,pfree]',
    description: 'The free space of swap volume/file in percent.',
    lastvalue: '100',
  },
  {
    itemid: '29176',
    name: 'Interrupts per second',
    key_: 'system.cpu.intr',
    description: '',
    lastvalue: '52.7926182308762',
  },
  {
    itemid: '29174',
    name: 'Load average (15m avg)',
    key_: 'system.cpu.load[all,avg15]',
    description: '',
    lastvalue: '0.05',
  },
  {
    itemid: '29170',
    name: 'Load average (1m avg)',
    key_: 'system.cpu.load[all,avg1]',
    description: '',
    lastvalue: '0',
  },
  {
    itemid: '29175',
    name: 'Load average (5m avg)',
    key_: 'system.cpu.load[all,avg5]',
    description: '',
    lastvalue: '0.01',
  },
  {
    itemid: '29161',
    name: 'Number of CPUs',
    key_: 'system.cpu.num',
    description: '',
    lastvalue: '1',
  },
  {
    itemid: '29189',
    name: 'Number of logged in users',
    key_: 'system.users.num',
    description: 'Number of users who are currently logged in.',
    lastvalue: '1',
  },
  {
    itemid: '29195',
    name: 'Operating system',
    key_: 'system.sw.os',
    description: '',
    lastvalue:
      'Linux version 3.10.0-1160.el7.x86_64 (mockbuild@kbuilder.bsys.centos.org) (gcc version 4.8.5 20150623 (Red Hat 4.8.5-44) (GCC) ) #1 SMP Mon Oct 19 16:18:59 UTC 2020',
  },
  {
    itemid: '29196',
    name: 'Operating system architecture',
    key_: 'system.sw.arch',
    description: 'Operating system architecture of the host.',
    lastvalue: 'x86_64',
  },
  {
    itemid: '29197',
    name: 'Software installed',
    key_: 'system.sw.packages',
    description: '',
    lastvalue: '[rpm] NetworkManager-1.18.8-2.el7_9.x86_64, NetworkManager-libnm-1.18.8-2.el7_9.x86_64, NetworkManager-team-1.18.8-2.el7_9.x86_64, NetworkManager-tui-1.18.8-2.el7_9.x86_64, NetworkManager-wifi-1.18.8-2.el7_9.x86_64, OpenIPMI-2.0.27-1.el7.x86_64, OpenIPMI-libs-2.0.27-1.el7.x86_64, OpenIPMI-modalias-2.0.27-1.el7.x86_64, acl-2.2.51-15.el7.x86_64, aic94xx-firmware-30-6.el7.noarch, alsa-firmware-1.0.28-2.el7.noarch, alsa-lib-1.1.8-1.el7.x86_64, alsa-tools-firmware-1.1.0-1.el7.x86_64, apr-1.4.8-7.el7.x86_64, apr-util-1.5.2-6.el7.x86_64, audit-2.8.5-4.el7.x86_64, audit-libs-2.8.5-4.el7.x86_64, audit-libs-python-2.8.5-4.el7.x86_64, authconfig-6.2.8-30.el7.x86_64, basesystem-10.0-7.el7.centos.noarch, bash-4.2.46-34.el7.x86_64, bc-1.06.95-13.el7.x86_64, bind-export-libs-9.11.4-26.P2.el7_9.5.x86_64, binutils-2.27-44.base.el7.x86_64, biosdevname-0.7.3-2.el7.x86_64, btrfs-progs-4.9.1-1.el7.x86_64, bzip2-libs-1.0.6-13.el7.x86_64, ca-certificates-2020.2.41-70.0.el7_8.noarch, centos-logos-70.0.6-3.el7.centos.noarch, centos-release-7-9.2009.1.el7.centos.x86_64, centos-release-scl-2-3.el7.centos.noarch, centos-release-scl-rh-2-3.el7.centos.noarch, checkpolicy-2.5-8.el7.x86_64, chkconfig-1.7.6-1.el7.x86_64, coreutils-8.22-24.el7_9.2.x86_64, cpio-2.11-28.el7.x86_64, cracklib-2.9.0-11.el7.x86_64, cracklib-dicts-2.9.0-11.el7.x86_64, cronie-1.4.11-23.el7.x86_64, cronie-anacron-1.4.11-23.el7.x86_64, crontabs-1.11-6.20121102git.el7.noarch, cryptsetup-libs-2.0.3-6.el7.x86_64, curl-7.29.0-59.el7_9.1.x86_64, cyrus-sasl-lib-2.1.26-23.el7.x86_64, dbus-1.10.24-15.el7.x86_64, dbus-glib-0.100-7.el7.x86_64, dbus-libs-1.10.24-15.el7.x86_64, dbus-python-1.1.1-9.el7.x86_64, dejavu-fonts-common-2.33-6.el7.noarch, dejavu-sans-fonts-2.33-6.el7.noarch, device-mapper-1.02.170-6.el7_9.5.x86_64, device-mapper-event-1.02.170-6.el7_9.5.x86_64, device-mapper-event-libs-1.02.170-6.el7_9.5.x86_64, device-mapper-libs-1.02.170-6.el7_9.5.x86_64, device-mapper-persistent-data-0.8.5-3.el7_9.2.x86_64, dhclient-4.2.5-82.el7.centos.x86_64, dhcp-common-4.2.5-82.el7.centos.x86_64, dhcp-libs-4.2.5-82.el7.centos.x86_64, diffutils-3.3-5.el7.x86_64, dmidecode-3.2-5.el7_9.1.x86_64, dracut-033-572.el7.x86_64, dracut-config-rescue-033-572.el7.x86_64, dracut-network-033-572.el7.x86_64, e2fsprogs-1.42.9-19.el7.x86_64, e2fsprogs-libs-1.42.9-19.el7.x86_64, ebtables-2.0.10-16.el7.x86_64, elfutils-default-yama-scope-0.176-5.el7.noarch, elfutils-libelf-0.176-5.el7.x86_64, elfutils-libs-0.176-5.el7.x86_64, ethtool-4.8-10.el7.x86_64, expat-2.1.0-12.el7.x86_64, file-5.11-37.el7.x86_64, file-libs-5.11-37.el7.x86_64, filesystem-3.2-25.el7.x86_64, findutils-4.5.11-6.el7.x86_64, fipscheck-1.4.1-6.el7.x86_64, fipscheck-lib-1.4.1-6.el7.x86_64, firewalld-0.6.3-13.el7_9.noarch, firewalld-filesystem-0.6.3-13.el7_9.noarch, fontpackages-filesystem-1.44-8.el7.noarch, fping-3.10-1.el7.x86_64, freetype-2.8-14.el7_9.1.x86_64, fxload-2002_04_11-16.el7.x86_64, gawk-4.0.2-4.el7_3.1.x86_64, gdbm-1.10-8.el7.x86_64, gettext-0.19.8.1-3.el7.x86_64, gettext-libs-0.19.8.1-3.el7.x86_64, glib2-2.56.1-8.el7.x86_64, glibc-2.17-324.el7_9.x86_64, glibc-common-2.17-324.el7_9.x86_64, gmp-6.0.0-15.el7.x86_64, gnupg2-2.0.22-5.el7_5.x86_64, gobject-introspection-1.56.1-1.el7.x86_64, gpg-pubkey-5072e1f5-5301d466, gpg-pubkey-79ea5ed4-508d25a6, gpg-pubkey-a14fe591-578876fd, gpg-pubkey-f2ee9d55-560cfc0a, gpg-pubkey-f4a80eb5-53a7ff4b, gpgme-1.3.2-5.el7.x86_64, gpm-libs-1.20.7-6.el7.x86_64, grep-2.20-3.el7.x86_64, groff-base-1.22.2-8.el7.x86_64, grub2-2.02-0.87.el7.centos.6.x86_64, grub2-common-2.02-0.87.el7.centos.6.noarch, grub2-pc-2.02-0.87.el7.centos.6.x86_64, grub2-pc-modules-2.02-0.87.el7.centos.6.noarch, grub2-tools-2.02-0.87.el7.centos.6.x86_64, grub2-tools-extra-2.02-0.87.el7.centos.6.x86_64, grub2-tools-minimal-2.02-0.87.el7.centos.6.x86_64, grubby-8.28-26.el7.x86_64, gzip-1.5-10.el7.x86_64, hardlink-1.0-19.el7.x86_64, hostname-3.13-3.el7_7.1.x86_64, httpd-2.4.6-97.el7.centos.x86_64, httpd-tools-2.4.6-97.el7.centos.x86_64, hwdata-0.252-9.7.el7.x86_64, info-5.1-5.el7.x86_64, initscripts-9.49.53-1.el7_9.1.x86_64, iproute-4.11.0-30.el7.x86_64, iprutils-2.4.17.1-3.el7_7.x86_64, ipset-7.1-1.el7.x86_64, ipset-libs-7.1-1.el7.x86_64, iptables-1.4.21-35.el7.x86_64, iputils-20160308-10.el7.x86_64, irqbalance-1.0.7-12.el7.x86_64, ivtv-firmware-20080701-26.el7.noarch, iwl100-firmware-39.31.5.1-80.el7_9.noarch, iwl1000-firmware-39.31.5.1-80.el7_9.noarch, iwl105-firmware-18.168.6.1-80.el7_9.noarch, iwl135-firmware-18.168.6.1-80.el7_9.noarch, iwl2000-firmware-18.168.6.1-80.el7_9.noarch, iwl2030-firmware-18.168.6.1-80.el7_9.noarch, iwl3160-firmware-25.30.13.0-80.el7_9.noarch, iwl3945-firmware-15.32.2.9-80.el7_9.noarch, iwl4965-firmware-228.61.2.24-80.el7_9.noarch, iwl5000-firmware-8.83.5.1_1-80.el7_9.noarch, iwl5150-firmware-8.24.2.2-80.el7_9.noarch, iwl6000-firmware-9.221.4.1-80.el7_9.noarch, iwl6000g2a-firmware-18.168.6.1-80.el7_9.noarch, iwl6000g2b-firmware-18.168.6.1-80.el7_9.noarch, iwl6050-firmware-41.28.5.1-80.el7_9.noarch, iwl7260-firmware-25.30.13.0-80.el7_9.noarch, jansson-2.10-1.el7.x86_64, json-c-0.11-4.el7_0.x86_64, kbd-1.15.5-15.el7.x86_64, kbd-legacy-1.15.5-15.el7.noarch, kbd-misc-1.15.5-15.el7.noarch, kernel-3.10.0-1160.25.1.el7.x86_64, kernel-3.10.0-1160.el7.x86_64, kernel-tools-3.10.0-1160.25.1.el7.x86_64, kernel-tools-libs-3.10.0-1160.25.1.el7.x86_64, kexec-tools-2.0.15-51.el7_9.2.x86_64, keyutils-libs-1.5.8-3.el7.x86_64, kmod-20-28.el7.x86_64, kmod-libs-20-28.el7.x86_64, kpartx-0.4.9-134.el7_9.x86_64, krb5-libs-1.15.1-50.el7.x86_64, less-458-9.el7.x86_64, libX11-1.6.7-3.el7_9.x86_64, libX11-common-1.6.7-3.el7_9.noarch, libXau-1.0.8-2.1.el7.x86_64, libXpm-3.5.12-1.el7.x86_64, libacl-2.2.51-15.el7.x86_64, libaio-0.3.109-13.el7.x86_64, libassuan-2.1.0-3.el7.x86_64, libattr-2.4.46-13.el7.x86_64, libblkid-2.23.2-65.el7_9.1.x86_64, libcap-2.22-11.el7.x86_64, libcap-ng-0.7.5-4.el7.x86_64, libcgroup-0.41-21.el7.x86_64, libcom_err-1.42.9-19.el7.x86_64, libcroco-0.6.12-6.el7_9.x86_64, libcurl-7.29.0-59.el7_9.1.x86_64, libdaemon-0.14-7.el7.x86_64, libdb-5.3.21-25.el7.x86_64, libdb-utils-5.3.21-25.el7.x86_64, libdrm-2.4.97-2.el7.x86_64, libedit-3.0-12.20121213cvs.el7.x86_64, libestr-0.1.9-2.el7.x86_64, libevent-2.0.21-4.el7.x86_64, libfastjson-0.99.4-3.el7.x86_64, libffi-3.0.13-19.el7.x86_64, libgcc-4.8.5-44.el7.x86_64, libgcrypt-1.5.3-14.el7.x86_64, libgomp-4.8.5-44.el7.x86_64, libgpg-error-1.12-3.el7.x86_64, libidn-1.28-4.el7.x86_64, libjpeg-turbo-1.2.90-8.el7.x86_64, libmnl-1.0.3-7.el7.x86_64, libmount-2.23.2-65.el7_9.1.x86_64, libndp-1.2-9.el7.x86_64, libnetfilter_conntrack-1.0.6-1.el7_3.x86_64, libnfnetlink-1.0.1-4.el7.x86_64, libnl3-3.2.28-4.el7.x86_64, libnl3-cli-3.2.28-4.el7.x86_64, libpciaccess-0.14-1.el7.x86_64, libpipeline-1.2.3-3.el7.x86_64, libpng-1.5.13-8.el7.x86_64, libpwquality-1.2.3-5.el7.x86_64, libselinux-2.5-15.el7.x86_64, libselinux-python-2.5-15.el7.x86_64, libselinux-utils-2.5-15.el7.x86_64, libsemanage-2.5-14.el7.x86_64, libsemanage-python-2.5-14.el7.x86_64, libsepol-2.5-10.el7.x86_64, libsmartcols-2.23.2-65.el7_9.1.x86_64, libss-1.42.9-19.el7.x86_64, libssh2-1.8.0-4.el7.x86_64, libstdc++-4.8.5-44.el7.x86_64, libsysfs-2.1.0-16.el7.x86_64, libtasn1-4.10-1.el7.x86_64, libteam-1.29-3.el7.x86_64, libtool-ltdl-2.4.2-22.el7_3.x86_64, libunistring-0.9.3-9.el7.x86_64, libuser-0.60-9.el7.x86_64, libutempter-1.1.6-4.el7.x86_64, libuuid-2.23.2-65.el7_9.1.x86_64, libverto-0.2.5-4.el7.x86_64, libwebp-0.3.0-7.el7.x86_64, libxcb-1.13-1.el7.x86_64, libxml2-2.9.1-6.el7.5.x86_64, libxml2-python-2.9.1-6.el7.5.x86_64, libxslt-1.1.28-6.el7.x86_64, linux-firmware-20200421-80.git78c0348.el7_9.noarch, logrotate-3.8.6-19.el7.x86_64, lsscsi-0.27-6.el7.x86_64, lua-5.1.4-15.el7.x86_64, lvm2-2.02.187-6.el7_9.5.x86_64, lvm2-libs-2.02.187-6.el7_9.5.x86_64, lz4-1.8.3-1.el7.x86_64, lzo-2.06-8.el7.x86_64, mailcap-2.1.41-2.el7.noarch, make-3.82-24.el7.x86_64, man-db-2.6.3-11.el7.x86_64, microcode_ctl-2.1-73.8.el7_9.x86_64, mozjs17-17.0.0-20.el7.x86_64, mysql-community-client-5.7.34-1.el7.x86_64, mysql-community-common-5.7.34-1.el7.x86_64, mysql-community-libs-5.7.34-1.el7.x86_64, mysql-community-libs-compat-5.7.34-1.el7.x86_64, mysql-community-server-5.7.34-1.el7.x86_64, mysql57-community-release-el7-9.noarch, ncurses-5.9-14.20130511.el7_4.x86_64, ncurses-base-5.9-14.20130511.el7_4.noarch, ncurses-libs-5.9-14.20130511.el7_4.x86_64, net-snmp-libs-5.7.2-49.el7_9.1.x86_64, net-tools-2.0-0.25.20131004git.el7.x86_64, newt-0.52.15-4.el7.x86_64, newt-python-0.52.15-4.el7.x86_64, nspr-4.25.0-2.el7_9.x86_64, nss-3.53.1-7.el7_9.x86_64, nss-pem-1.0.3-7.el7.x86_64, nss-softokn-3.53.1-6.el7_9.x86_64, nss-softokn-freebl-3.53.1-6.el7_9.x86_64, nss-sysinit-3.53.1-7.el7_9.x86_64, nss-tools-3.53.1-7.el7_9.x86_64, nss-util-3.53.1-1.el7_9.x86_64, numactl-libs-2.0.12-5.el7.x86_64, openldap-2.4.44-23.el7_9.x86_64, openssh-7.4p1-21.el7.x86_64, openssh-clients-7.4p1-21.el7.x86_64, openssh-server-7.4p1-21.el7.x86_64, openssl-1.0.2k-21.el7_9.x86_64, openssl-libs-1.0.2k-21.el7_9.x86_64, os-prober-1.58-9.el7.x86_64, p11-kit-0.23.5-3.el7.x86_64, p11-kit-trust-0.23.5-3.el7.x86_64, pam-1.1.8-23.el7.x86_64, parted-3.1-32.el7.x86_64, passwd-0.79-6.el7.x86_64, pciutils-libs-3.5.1-3.el7.x86_64, pcre-8.32-17.el7.x86_64, perl-5.16.3-299.el7_9.x86_64, perl-Carp-1.26-244.el7.noarch, perl-Encode-2.51-7.el7.x86_64, perl-Exporter-5.68-3.el7.noarch, perl-File-Path-2.09-2.el7.noarch, perl-File-Temp-0.23.01-3.el7.noarch, perl-Filter-1.49-3.el7.x86_64, perl-Getopt-Long-2.40-3.el7.noarch, perl-HTTP-Tiny-0.033-3.el7.noarch, perl-PathTools-3.40-5.el7.x86_64, perl-Pod-Escapes-1.04-299.el7_9.noarch, perl-Pod-Perldoc-3.20-4.el7.noarch, perl-Pod-Simple-3.28-4.el7.noarch, perl-Pod-Usage-1.63-3.el7.noarch, perl-Scalar-List-Utils-1.27-248.el7.x86_64, perl-Socket-2.010-5.el7.x86_64, perl-Storable-2.45-3.el7.x86_64, perl-Text-ParseWords-3.29-4.el7.noarch, perl-Time-HiRes-1.9725-3.el7.x86_64, perl-Time-Local-1.2300-2.el7.noarch, perl-constant-1.27-2.el7.noarch, perl-libs-5.16.3-299.el7_9.x86_64, perl-macros-5.16.3-299.el7_9.x86_64, perl-parent-0.225-244.el7.noarch, perl-podlators-2.5.1-3.el7.noarch, perl-threads-1.87-4.el7.x86_64, perl-threads-shared-1.43-6.el7.x86_64, pinentry-0.8.1-17.el7.x86_64, pkgconfig-0.27.1-4.el7.x86_64, plymouth-0.8.9-0.34.20140113.el7.centos.x86_64, plymouth-core-libs-0.8.9-0.34.20140113.el7.centos.x86_64, plymouth-scripts-0.8.9-0.34.20140113.el7.centos.x86_64, policycoreutils-2.5-34.el7.x86_64, policycoreutils-python-2.5-34.el7.x86_64, polkit-0.112-26.el7.x86_64, polkit-pkla-compat-0.1-4.el7.x86_64, popt-1.13-16.el7.x86_64, postfix-2.10.1-9.el7.x86_64, procps-ng-3.3.10-28.el7.x86_64, pth-2.0.7-23.el7.x86_64, pygpgme-0.3-9.el7.x86_64, pyliblzma-0.5.3-11.el7.x86_64, python-2.7.5-90.el7.x86_64, python-IPy-0.75-6.el7.noarch, python-chardet-2.2.1-3.el7.noarch, python-configobj-4.7.2-7.el7.noarch, python-decorator-3.4.0-3.el7.noarch, python-firewall-0.6.3-13.el7_9.noarch, python-gobject-base-3.22.0-1.el7_4.1.x86_64, python-iniparse-0.4-9.el7.noarch, python-kitchen-1.1.1-5.el7.noarch, python-libs-2.7.5-90.el7.x86_64, python-linux-procfs-0.4.11-4.el7.noarch, python-perf-3.10.0-1160.25.1.el7.x86_64, python-pycurl-7.19.0-19.el7.x86_64, python-pyudev-0.15-9.el7.noarch, python-schedutils-0.4-6.el7.x86_64, python-slip-0.4.0-4.el7.noarch, python-slip-dbus-0.4.0-4.el7.noarch, python-urlgrabber-3.10-10.el7.noarch, pyxattr-0.5.1-5.el7.x86_64, qrencode-libs-3.4.1-3.el7.x86_64, readline-6.2-11.el7.x86_64, rh-php72-1-2.el7.x86_64, rh-php72-php-bcmath-7.2.24-1.el7.x86_64, rh-php72-php-cli-7.2.24-1.el7.x86_64, rh-php72-php-common-7.2.24-1.el7.x86_64, rh-php72-php-fpm-7.2.24-1.el7.x86_64, rh-php72-php-gd-7.2.24-1.el7.x86_64, rh-php72-php-json-7.2.24-1.el7.x86_64, rh-php72-php-ldap-7.2.24-1.el7.x86_64, rh-php72-php-mbstring-7.2.24-1.el7.x86_64, rh-php72-php-mysqlnd-7.2.24-1.el7.x86_64, rh-php72-php-pdo-7.2.24-1.el7.x86_64, rh-php72-php-pear-1.10.5-1.el7.noarch, rh-php72-php-process-7.2.24-1.el7.x86_64, rh-php72-php-xml-7.2.24-1.el7.x86_64, rh-php72-php-zip-7.2.24-1.el7.x86_64, rh-php72-runtime-1-2.el7.x86_64, rootfiles-8.1-11.el7.noarch, rpm-4.11.3-45.el7.x86_64, rpm-build-libs-4.11.3-45.el7.x86_64, rpm-libs-4.11.3-45.el7.x86_64, rpm-python-4.11.3-45.el7.x86_64, rsyslog-8.24.0-57.el7_9.x86_64, scl-utils-20130529-19.el7.x86_64, sed-4.2.2-7.el7.x86_64, selinux-policy-3.13.1-268.el7_9.2.noarch, selinux-policy-targeted-3.13.1-268.el7_9.2.noarch, setools-libs-3.3.8-4.el7.x86_64, setup-2.8.71-11.el7.noarch, shadow-utils-4.6-5.el7.x86_64, shared-mime-info-1.8-5.el7.x86_64, slang-2.2.4-11.el7.x86_64, snappy-1.1.0-3.el7.x86_64, sqlite-3.7.17-8.el7_7.1.x86_64, sudo-1.8.23-10.el7_9.1.x86_64, systemd-219-78.el7_9.3.x86_64, systemd-libs-219-78.el7_9.3.x86_64, systemd-sysv-219-78.el7_9.3.x86_64, sysvinit-tools-2.88-14.dsf.el7.x86_64, tar-1.26-35.el7.x86_64, tcp_wrappers-libs-7.6-77.el7.x86_64, teamd-1.29-3.el7.x86_64, tuned-2.11.0-11.el7_9.noarch, tzdata-2021a-1.el7.noarch, unixODBC-2.3.1-14.el7.x86_64, ustr-1.0.4-16.el7.x86_64, util-linux-2.23.2-65.el7_9.1.x86_64, vim-common-7.4.629-8.el7_9.x86_64, vim-enhanced-7.4.629-8.el7_9.x86_64, vim-filesystem-7.4.629-8.el7_9.x86_64, vim-minimal-7.4.629-8.el7_9.x86_64, virt-what-1.18-4.el7.x86_64, wget-1.14-18.el7_6.1.x86_64, which-2.20-7.el7.x86_64, wpa_supplicant-2.6-12.el7_9.2.x86_64, xfsprogs-4.5.0-22.el7.x86_64, xz-5.2.2-1.el7.x86_64, xz-libs-5.2.2-1.el7.x86_64, yum-3.4.3-168.el7.centos.noarch, yum-metadata-parser-1.1.4-10.el7.x86_64, yum-plugin-fastestmirror-1.1.31-54.el7_8.noarch, yum-utils-1.1.31-54.el7_8.noarch, zabbix-agent-5.0.11-1.el7.x86_64, zabbix-apache-conf-scl-5.0.11-1.el7.noarch, zabbix-get-5.0.11-1.el7.x86_64, zabbix-release-5.0-1.el7.noarch, zabbix-server-mysql-5.0.11-1.el7.x86_64, zabbix-web-5.0.11-1.el7.noarch, zabbix-web-deps-scl-5.0.11-1.el7.noarch, zabbix-web-mysql-scl-5.0.11-1.el7.noarch, zlib-1.2.7-19.el7_9.x86_64',
  },
  {
    itemid: '29185',
    name: 'System boot time',
    key_: 'system.boottime',
    description: '',
    lastvalue: '1620235980',
  },
  {
    itemid: '29188',
    name: 'System description',
    key_: 'system.uname',
    description: "The information as normally returned by 'uname -a'.",
    lastvalue:
      'Linux localhost.localdomain 3.10.0-1160.el7.x86_64 #1 SMP Mon Oct 19 16:18:59 UTC 2020 x86_64',
  },
  {
    itemid: '29186',
    name: 'System local time',
    key_: 'system.localtime',
    description: 'System local time of the host.',
    lastvalue: '1620506966',
  },
  {
    itemid: '29187',
    name: 'System name',
    key_: 'system.hostname',
    description: 'System host name.',
    lastvalue: 'localhost.localdomain',
  },
  {
    itemid: '29184',
    name: 'System uptime',
    key_: 'system.uptime',
    description: "System uptime in 'N days, hh:mm:ss' format.",
    lastvalue: '270985',
  },
  {
    itemid: '29180',
    name: 'Total swap space',
    key_: 'system.swap.size[,total]',
    description: 'The total space of swap volume/file in bytes.',
    lastvalue: '2147479552',
  },
];

export default function Deposits(props) {
  const classes = useStyles();
  const { host } = props;

  // Do không có data từ server nên t comment mấy này đẻ không có lỗi, nhớ mở ra 

  // let data = JSON.parse(localStorage.getItem('token'));
  // let data2 = JSON.parse(localStorage.getItem('hostdata'));
  // let data3 = JSON.parse(localStorage.getItem('itemdata'));
  // console.log(host);
  // console.log(data3.result);

  return (
    <React.Fragment>
      <Typography color='textPrimary' className={classes.depositContext}>
        {/* <Box fontWeight='fontWeightMedium' className={classes.forHost}>
          Returned Authentication: {data}
        </Box>
        <Box fontWeight='fontWeightMedium' width='25%' display='inline-block'>
          "host": {data2.result[0].host}
        </Box>
        <Box fontWeight='fontWeightMedium' display='inline-block'>
          "hostid": {data2.result[0].hostid}
        </Box> */}
        {/* <Box>
          <Box fontWeight='fontWeightLight'>Divice: {data3.result[0].name}</Box>
          <Box fontWeight='fontWeightLight'>
            Description: {data3.result[0].description}
          </Box>
          <Box fontWeight='fontWeightLight'>
            Value: {data3.result[0].lastvalue}
          </Box>
        </Box>
        <p></p>
        <Box>
          <Box fontWeight='fontWeightLight'>Divice: {data3.result[1].name}</Box>
          <Box fontWeight='fontWeightLight'>
            Description: {data3.result[1].description}
          </Box>
          <Box fontWeight='fontWeightLight'>
            Value: {data3.result[1].lastvalue}
          </Box>
        </Box>
        <p></p>
        <Box>
          <Box fontWeight='fontWeightLight'>Divice: {data3.result[2].name}</Box>
          <Box fontWeight='fontWeightLight'>
            Description: {data3.result[2].description}
          </Box>
          <Box fontWeight='fontWeightLight'>
            Value: {data3.result[2].lastvalue}
          </Box>
        </Box>
        <p></p>
        <Box>
          <Box fontWeight='fontWeightLight'>Divice: {data3.result[3].name}</Box>
          <Box fontWeight='fontWeightLight'>
            Description: {data3.result[3].description}
          </Box>
          <Box fontWeight='fontWeightLight'>
            Value: {data3.result[3].lastvalue}
          </Box>
        </Box> */}

        {fakeData.map((item) => (
          <Box key={item.itemid} style={{marginTop: 16}}>
            {' '}
            <Box fontWeight='fontWeightLight'>
              Divice: {item.name}
            </Box>
            <Box fontWeight='fontWeightLight'>
              Description: {item.description}
            </Box>
            <Box fontWeight='fontWeightLight'>
              Value: {item.lastvalue}
            </Box>
          </Box>
        ))}
      </Typography>
    </React.Fragment>
  );
}

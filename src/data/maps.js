import React from 'react';
import { Box, Link, Typography } from '@material-ui/core';
import _ from 'lodash';

import { splitStringInParentheses } from '../utils';

export const mapMaxPhase = (value) =>
  ({
    1: String.fromCodePoint(8544),
    2: String.fromCodePoint(8545),
    3: String.fromCodePoint(8546),
    4: String.fromCodePoint(8547),
  }[value]);

export const mapScientificName = (str) =>
  ({
    'Homo sapiens': 'Human',
    'Severe acute respiratory syndrome-related coronavirus': 'SARS-CoV-1',
    'Severe acute respiratory syndrome coronavirus 2': 'SARS-CoV-2',
  }[str?.trim()]);

export const mapTissueDistribution = (str) =>
  ({
    'Not detected': 0,
    'Detected in single': 10,
    'Detected in some': 20,
    'Detected in many': 30,
    'Detected in all': 40,
  }[str?.trim()]);

export const mapTractabilityTopBucketSM = (str) =>
  ({
    'Targets with drugs in phase IV': 1,
    'Targets with drugs in phase II or phase III': 2,
    'Targets with drugs in phase 0 or phase I': 3,
    'Targets with crystal structures with ligands': 4,
    'Targets with a drugEBIlity score equal or greater than 0.7': 5,
    'Targets with drugEBIlity between 0 and 0.7': 6,
    'Targets with drugEBIlity between zero and 0.7': 6,
    'Targets with ligands': 7,
    'Targets with a predicted Ro5 druggable domain (druggable genome)': 8,
  }[str?.trim()]);

export const tractabilityTopBucketSMCaptions = [
  <span>Targets with drugs in phase IV.</span>,
  <span>Targets with drugs in phase II or phase III.</span>,
  <span>Targets with drugs in phase 0 or phase I.</span>,
  <span>
    Targets with crystal structures with ligand.
    <br />
    <small>
      (excluding: buffer compounds, solvents, crystallization agents/additives
      and sugars).
    </small>
  </span>,
  <span>Targets with a drugEBIlity score equal or greater than 0.7.</span>,
  <span>Targets with drugEBIlity between 0 and 0.7.</span>,
  <span>
    Targets with ligands{' '}
    <small>(PFI &#8804; 7, SMART hits &#8804; 2, scaffolds &#8805; 2).</small>
  </span>,
  <span>
    Targets considered druggable.{' '}
    <small>
      See{' '}
      <Link href="https://europepmc.org/article/MED/28356508" target="blank">
        Finan et al. 2017
      </Link>
      .
    </small>
  </span>,
];

// Sorting in here is based on:
// https://platform-docs.opentargets.org/target/tractability
export const mapTractabilityTopBucketAB = (str) =>
  ({
    'Targets with drugs in phase IV': 1,
    'Targets with drugs in phase II or phase III': 2,
    'Targets with drugs in phase 0 or phase I': 3,
    'Targets with GO cell component terms plasma membrane or secreted': 5,
    'Targets with predicted signal peptide and transmembrane domains': 7,
    'GO cell component - medium confidence': 8,
    'Targets with GO cell component terms plasma membrane or secreted with low or unknown confidence': 8,
    'Targets located in the plasma membrane': 9,
    'Human Protein Atlas - high confidence': 4,
  }[str?.trim()]);

export const tractabilityTopBucketABCaptions = [
  <span>Targets with drugs in phase IV.</span>,
  <span>Targets with drugs in phase II or phase III.</span>,
  <span>Targets with drugs in phase 0 or phase I.</span>,
  <span>
    Targets with UniProt <i>Subcellular location</i> terms indicative for plasma
    membrane, extracellular region/matrix, or secretion -{' '}
    <strong>high confidence</strong>.
  </span>,
  <span>
    Targets with GO <i>Cellular component</i> terms indicative for plasma
    membrane, extracellular region/matrix, or secretion -{' '}
    <strong>high confidence</strong>.
  </span>,
  <span>
    Targets with UniProt <i>Subcellular location</i> terms indicative for plasma
    membrane, extracellular region/matrix, or secretion -{' '}
    <strong>medium confidence</strong>.
  </span>,
  <span>
    Targets with predicted Signal Peptide or Trans-membrane regions, and not
    destined to organelles.
  </span>,
  <span>
    Targets with GO <i>Cellular component</i> terms indicative for plasma
    membrane, extracellular region/matrix, or secretion -{' '}
    <strong>medium confidence</strong>.
  </span>,
  <span>
    Targets with main location term indicative for plasma membrane -{' '}
    <strong>high confidence</strong>.
  </span>,
];

export const mapTractabilityTopBucketOther = (str) =>
  ({
    'Targets with drugs in phase IV': 1,
    'Targets with drugs in phase II or phase III': 2,
    'Targets with drugs in phase 0 or phase I': 3,
  }[str?.trim()]);

export const tractabilityTopBucketOtherCaptions = [
  <span>Targets with drugs in phase IV.</span>,
  <span>Targets with drugs in phase II or phase III.</span>,
  <span>Targets with drugs in phase 0 or phase I.</span>,
];

export const mapSource = (sourceName, sourceAccession) =>
  ({
    'HGNC Symbol': `https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/${
      sourceAccession.split(':')[1]
    }`,
    miRBase: `http://www.mirbase.org/cgi-bin/mirna_entry.pl?acc=${sourceAccession}`,
    'NCBI gene': `https://www.ncbi.nlm.nih.gov/gene/${sourceAccession}`,
    'UniprotKB/Swiss-Prot': `http://purl.uniprot.org/uniprot/${sourceAccession}`,
  }[sourceName]);

const invitroCovidActivityMap = [
  'highly active',
  'highly active and cytotoxic',
  'weakly active',
  'weakly active and cytotoxic',
  'inactive',
];

const mapInvitroCovidActivity = (str) => {
  let activityLevel;

  invitroCovidActivityMap.forEach((level) => {
    if (str.includes(level)) activityLevel = level;
  });

  return activityLevel;
};

const stripEntryGroups = (entryGroups) => {
  const strippedEntryGroups = {};

  invitroCovidActivityMap.forEach((group) => {
    strippedEntryGroups[group] = entryGroups[group]?.map((entry) => {
      const [compound, method] = splitStringInParentheses(entry);
      const strippedCompound = compound
        .replace(/highly|active|and|cytotoxic|weakly|inactive/g, '')
        .trim();

      return {
        compound: strippedCompound,
        method,
      };
    });
  });

  return strippedEntryGroups;
};

export const prepareInvitroCovidActivity = (row) => {
  if (!row) return null;

  const entries = row.split(';');
  const entryGroups = _.groupBy(entries, mapInvitroCovidActivity);
  return stripEntryGroups(entryGroups);
};

export const renderMRFieldAccordionDetails = (entry) => (
  <Box>
    <Typography display="block" variant="caption">
      <strong>Number of SNPs:</strong> {entry['Number of SNPs']}
    </Typography>
    <Typography display="block" variant="caption">
      <strong>MR estimate:</strong> {entry['MR estimate']}
    </Typography>
    <Typography display="block" variant="caption">
      <strong>CI (95%):</strong> ({entry['Lower conf.int']},{' '}
      {entry['Upper conf.int']})
    </Typography>
    <Typography display="block" variant="caption">
      <strong>
        <i>p</i>-value:
      </strong>{' '}
      {entry['p-value']}
    </Typography>
  </Box>
);

export const renderColocalisationAccordionDetails = (entry) => (
  <Box>
    <Typography display="block" variant="caption">
      <strong>Candidate SNP:</strong> {entry['Candidate SNP']}
    </Typography>
    <Typography display="block" variant="caption">
      <strong>Posterior probability:</strong> {entry['Posterior probability']}
    </Typography>
  </Box>
);

export const biotypeList = [
  'lncRNA',
  'unprocessed_pseudogene',
  'protein_coding',
  'processed_pseudogene',
  'snRNA',
  'misc_RNA',
  'transcribed_unitary_pseudogene',
  'miRNA',
  'snoRNA',
  'rRNA_pseudogene',
  'transcribed_unprocessed_pseudogene',
  'TR_J_gene',
  'TEC',
  'IG_V_gene',
  'LRG_gene',
  'IG_V_pseudogene',
  'transcribed_processed_pseudogene',
  'translated_processed_pseudogene',
  'scaRNA',
  'IG_J_gene',
  'TR_V_gene',
  'polymorphic_pseudogene',
  'IG_J_pseudogene',
  'unitary_pseudogene',
  'rRNA',
  'TR_V_pseudogene',
  'IG_D_gene',
  'TR_D_gene',
  'pseudogene',
  'IG_C_pseudogene',
  'Mt_tRNA',
  'IG_C_gene',
  'scRNA',
  'TR_J_pseudogene',
  'ribozyme',
  'TR_C_gene',
  'sRNA',
  'translated_unprocessed_pseudogene',
  'IG_pseudogene',
  'vaultRNA',
  'Mt_rRNA',
].sort();

export const subcellularLocationList = [
  'Centrosome',
  'Nucleoplasm',
  'Nuclear bodies',
  'Endoplasmic reticulum',
  'Vesicles',
  'Plasma membrane',
  'Actin filaments',
  'Cytosol',
  'Nucleoli',
  'Intermediate filaments',
  'Golgi apparatus',
  'Midbody ring',
  'Mitochondria',
  'Midbody',
  'Cell Junctions',
  'Microtubules',
  'Cytokinetic bridge',
  'Centriolar satellite',
  'Nuclear speckles',
  'Nuclear membrane',
  'Cytoplasmic bodies',
  'Aggresome',
  'Nucleoli fibrillar center',
  'Focal adhesion sites',
  'Mitotic spindle',
  'Lipid droplets',
  'Microtubule ends',
  'Rods & Rings',
  'Peroxisomes',
  'Cleavage furrow',
  'Lysosomes',
  'Endosomes',
].sort();

export const tissueSpecificityList = [
  'Tissue enriched',
  'Tissue enhanced',
  'Group enriched',
  'Low tissue specificity',
  'Not detected',
].sort();

export const tissueDistributionList = [
  'Detected in all',
  'Detected in many',
  'Detected in some',
  'Detected in single',
  'Not detected',
].sort();

export const specificTissueList = [
  'pituitary gland',
  'lymphoid tissue',
  'brain',
  'blood',
  'stomach 1',
  'liver',
  'placenta',
  'skin 1',
  'heart muscle',
  'tongue',
  'esophagus',
  'bone marrow',
  'adipose tissue',
  'breast',
  'ductus deferens',
  'testis',
  'skeletal muscle',
  'fallopian tube',
  'salivary gland',
  'retina',
  'intestine',
  'epididymis',
  'ovary',
  'cervix, uterine',
  'endometrium 1',
  'kidney',
  'prostate',
  'pancreas',
  'seminal vesicle',
  'lung',
  'vagina',
  'gallbladder',
  'thyroid gland',
  'smooth muscle',
  'parathyroid gland',
  'adrenal gland',
  'urinary bladder',
].sort();

export const safetySystemsAffected = [
  'cardiovascular system',
  'central nervous system',
  'nervous system',
  'renal system',
  'peripheral nervous system',
  'immune system',
  'gastrointestinal system',
  'pancreas',
  'respiratory system',
  'endocrine system',
  'blood',
  'lung',
  'liver',
  'development',
  'Pharmaco-kinetics',
  'gall bladder',
  'genitourinary system',
  'gonad',
].sort();

export const redToGreen9Step = [
  '#c6e3c7',
  '#d4ead0',
  '#e3f1d9',
  '#f1f8e1',
  '#ffffea',
  '#fef0db',
  '#fde0cd',
  '#fcd1be',
  '#fbc1af',
];

export const redToGreen8Step = [
  '#c6e3c7',
  '#d6ebd1',
  '#e7f3db',
  '#f7fbe5',
  '#fef6e2',
  '#fde4d1',
  '#fcd3c0',
  '#fbc1af',
];

export const redToGreen3Step = ['#fbc1af', '#ffffea', '#c6e3c7'];

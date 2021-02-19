// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  
  // Returns a random single stand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
  }
  
  const pAequorFactory = (n, arr) => {
    return {
      specimenNum: n,
      _dna: arr,
      get dna() {
        return this._dna;
      },
      set dna(newDNA) {
        this._dna = newDNA;
      },
      mutate() {
        const mutInd = Math.floor(Math.random() * this.dna.length);
        let newBase = '';
        do {
          newBase = returnRandBase();
        } while (newBase === this.dna[mutInd]);
        this.dna[mutInd] = newBase;
        return this.dna;
      },
      mutateOption() {
        const mutInd = Math.floor(Math.random() * this.dna.length);
        let newBase = '';
        let newDNA = []
        do {
          newBase = returnRandBase();
        } while (newBase === this.dna[mutInd]);
        newDNA[mutInd] = newBase;
        return newDNA;
      },
      compareDNA(pAequor) {
        let counter = 0;
        for (i = 0; i < 15; i++) {
          if (pAequor.dna[i] === this.dna[i]) {
            counter++;
          }
        }
        console.log(`specimen #${pAequor.specimenNum} and specimen #${this.specimenNum} have ${(counter / 15 * 100).toFixed(1)}% DNA in common`)
      },
      willLikelySurvive() {
        const contentCG = this.dna.filter(base => {return (base === 'C' || base === 'G')});
        return contentCG.length / 15 >= 0.6;
      },
      complementStrand() {
        const newStrand = [];
        for (let i = 0; i < this.dna.length; i++) {
          switch (this.dna[i]) {
            case 'A':
            newStrand.push('T');
            break;
            case 'T':
            newStrand.push('A');
            break;
            case 'C':
            newStrand.push('G');
            break;
            case 'G':
            newStrand.push('C');
            break;
          }
        }
        return newStrand;
      }
    }
  }
  
  const create30instances = () => {
    let set30 = [];
    let n = 0;
    while (set30.length < 30) {
      const newStrand = pAequorFactory(n, mockUpStrand());
      n++;
      if (newStrand.willLikelySurvive()) {
        set30.push(newStrand);
      }
    }
    return set30;
  }
  
  console.log(create30instances())
  
  let strand1 = pAequorFactory(1, mockUpStrand());
  console.log(strand1)
  console.log(strand1.complementStrand())
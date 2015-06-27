import sys, os, json, math, collections, operator

def round_this(n):
    return int(math.ceil(n/100.0))*100

if __name__ == "__main__":
    f = open('gene.stats')
    f2 = open('pcg.txt')
    pcg = []
    for l in f2:
        l = l.strip()
        pcg.append(l)
    # print pcg

    data = {}
    counts = ["counts"]
    genes = []
    buckets = {}
    mutations_raw_counts = {}
    mutations_normalized = {}
    mutations_all = {}
    for line in f:
        line = line.strip()
        eles = line.split(",")
        bucket = round_this(int(eles[10]))
        gene_length = int(eles[8]) - int(eles[7])
        blood = int(eles[11])
        bladder = int(eles[12])
        brain = int(eles[13])
        bone = int(eles[14])
        breast = int(eles[15])
        head = int(eles[16])
        cervix = int(eles[17])
        colo = int(eles[18])
        eso = int(eles[19])
        kid = int(eles[20])
        liv = int(eles[21])
        ov = int(eles[22])
        lung = int(eles[23])
        panc = int(eles[24])
        pros = int(eles[25])
        skin = int(eles[26])
        stom = int(eles[27])
        uter = int(eles[28])
        if eles[0] not in mutations_all and eles[0] in pcg:
            if int(eles[10]) != 0:
                mutations_all[eles[0]] = (float(eles[10])/gene_length, eles[8], eles[7], gene_length, int(eles[10]))

        if eles[0] in pcg:
            if int(eles[10]) != 0:
                mutations_raw_counts[eles[0]] = int(eles[10])
        #mutations_raw_counts.append({"name":eles[0], 'all': int(eles[10]), 'blood':blood, 'bladder':bladder, 'brain':brain, 'bone':bone, 'breast':breast, 'head':head, 'cervix':cervix, 'colorectal':colo, 'esophagus':eso, 'kidney': kid, 'liver':liv, 'ovary':ov, 'lung':lung, 'pancreas':panc, 'prostate': pros, 'skin':skin, 'stomach':stom, 'uterus': uter})
        #mutations_normalized.append({"name":eles[0], 'all':int(eles[10])/gene_length, 'blood':blood/gene_length, 'bladder':bladder/gene_length, 'brain':brain/gene_length, 'bone':bone/gene_length, 'breast':breast/gene_length, 'head':head/gene_length, 'cervix':cervix/gene_length, 'colorectal':colo/gene_length, 'esophagus':eso/gene_length, 'kidney': kid/gene_length, 'liver':liv/gene_length, 'ovary':ov/gene_length, 'lung':lung/gene_length, 'pancreas':panc/gene_length, 'prostate': pros/gene_length, 'skin':skin/gene_length, 'stomach':stom/gene_length, 'uterus': uter/gene_length})

        # zero = eles[29]
        # if int(zero) != 0:
        #     print 'UHOH'
        if bucket not in buckets:
            buckets[bucket] = 1
        elif bucket in buckets:
            buckets[bucket] += 1
        # print str(eles[10]), str(bucket)
        # if eles[0] not in data and int(eles[10]) > 0:
        #     data[eles[0]] = {"variants": int(eles[9]), "calls": int(eles[10]), "bucket": bucket}
        
        # if int(eles[10]) > 5: 
        #     genes.append(eles[0])
        #     counts.append(eles[10])
    #sorted_raw = sorted(mutations_raw_counts, key=itemgetter('all'))
    #sorted_nom = sorted(mutations_normalized, key=itemgetter('all'))
    # # sorted_all = sorted(mutations_all)
    sorted_x = sorted(mutations_all.items(), key=operator.itemgetter(1))
    sorted_y = sorted(mutations_raw_counts.items(), key=operator.itemgetter(1))
    oneeight = sorted_x[len(sorted_x)-181:len(sorted_x)-1]
    oneeight_y = sorted_y[len(sorted_y)-181:len(sorted_y)-1]
    for x in oneeight:
        print x[0] + "\t" + str(x[1])

    # buckets1 = []
    # for bucket in sorted(buckets):
    #     buckets1.append({"bucket": bucket, "count": buckets[bucket]})
    # #print data
    # print "var buckets = ", buckets1

    #print "var just_genes = " + str(genes)
    # print len(genes), len(counts)
    #print "var gene_counts = " + str(json.dumps(data))
    # print "var gene_counts = " + str(counts)

    #print json.dumps(data)
import sys, os, json, math

def round_this(n):
    return int(math.ceil(n/100.0))*100

if __name__ == "__main__":
    f = open('gene.stats')
    data = {}
    counts = ["counts"]
    genes = []
    buckets = {}
    for line in f:
        line = line.strip()
        eles = line.split(",")
        bucket = round_this(int(eles[10]))
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
    buckets1 = []
    for bucket in sorted(buckets):
        buckets1.append({"bucket": bucket, "count": buckets[bucket]})
    #print data
    print "var buckets = ", buckets1

    #print "var just_genes = " + str(genes)
    # print len(genes), len(counts)
    #print "var gene_counts = " + str(json.dumps(data))
    # print "var gene_counts = " + str(counts)

    #print json.dumps(data)